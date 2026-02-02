package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"sort"
	"strings"
	"time"
	"unicode"

	"golang.org/x/text/encoding/charmap"
	"golang.org/x/text/unicode/norm"
	"gopkg.in/yaml.v3"
)

// --- Structures YAML config ---

type CSVSource struct {
	URL     string `yaml:"url"`
	Periode string `yaml:"periode"`
}

type TempsParole2022Config struct {
	Description string      `yaml:"description"`
	DatasetURL  string      `yaml:"dataset_url"`
	CSVURLs     []CSVSource `yaml:"csv_urls"`
}

type Config struct {
	Sources struct {
		TempsParole2022 TempsParole2022Config `yaml:"temps_parole_2022"`
	} `yaml:"sources"`
}

// --- Structures JSON data ---

type CandidatJSON struct {
	Nom                  string `json:"nom"`
	Voix                 int    `json:"voix"`
	TempsParoleSecondes  int    `json:"temps_parole_secondes,omitempty"`
}

type ElectionJSON struct {
	Description         string         `json:"description"`
	PeriodeTempsParole  string         `json:"periode_temps_parole"`
	SourceTempsParole   string         `json:"source_temps_parole"`
	SourceResultats     string         `json:"source_resultats"`
	Candidats           []CandidatJSON `json:"candidats"`
}

type DataJSON struct {
	Elections map[string]ElectionJSON `json:"elections"`
}

// --- Structure résultat ---

type CandidatResult struct {
	Nom                string
	Voix               int
	TempsParoleSeconds int
	Ratio              float64 // secondes de parole par voix
}

func main() {
	config, err := loadConfig("config.yaml")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Erreur config: %v\n", err)
		os.Exit(1)
	}

	data, err := loadData("data.json")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Erreur data: %v\n", err)
		os.Exit(1)
	}

	// --- 2017 : données complètes dans data.json ---
	fmt.Println("==========================================================")
	fmt.Println("  PRÉSIDENTIELLE 2017 - 1er tour (23 avril 2017)")
	fmt.Println("  Temps de parole : 1er février au 21 avril 2017 (CSA)")
	fmt.Println("==========================================================")

	election2017 := data.Elections["2017"]
	results2017 := make([]CandidatResult, 0, len(election2017.Candidats))
	for _, c := range election2017.Candidats {
		ratio := float64(c.TempsParoleSecondes) / float64(c.Voix)
		results2017 = append(results2017, CandidatResult{
			Nom:                c.Nom,
			Voix:               c.Voix,
			TempsParoleSeconds: c.TempsParoleSecondes,
			Ratio:              ratio,
		})
	}
	displayTable(results2017)

	// --- 2022 : téléchargement CSV + données voix dans data.json ---
	fmt.Println()
	fmt.Println("==========================================================")
	fmt.Println("  PRÉSIDENTIELLE 2022 - 1er tour (10 avril 2022)")
	fmt.Println("  Temps de parole : 1er janvier au 8 avril 2022 (Arcom)")
	fmt.Println("==========================================================")

	tempsParole2022, err := downloadAndParseTempsParole2022(config)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Erreur téléchargement CSV 2022: %v\n", err)
		os.Exit(1)
	}

	election2022 := data.Elections["2022"]
	results2022 := make([]CandidatResult, 0, len(election2022.Candidats))
	for _, c := range election2022.Candidats {
		tp := matchTempsParole(c.Nom, tempsParole2022)
		ratio := 0.0
		if c.Voix > 0 && tp > 0 {
			ratio = float64(tp) / float64(c.Voix)
		}
		results2022 = append(results2022, CandidatResult{
			Nom:                c.Nom,
			Voix:               c.Voix,
			TempsParoleSeconds: tp,
			Ratio:              ratio,
		})
	}
	displayTable(results2022)
}

func loadConfig(path string) (*Config, error) {
	f, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("lecture %s: %w", path, err)
	}
	var cfg Config
	if err := yaml.Unmarshal(f, &cfg); err != nil {
		return nil, fmt.Errorf("parsing YAML: %w", err)
	}
	return &cfg, nil
}

func loadData(path string) (*DataJSON, error) {
	f, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("lecture %s: %w", path, err)
	}
	var data DataJSON
	if err := json.Unmarshal(f, &data); err != nil {
		return nil, fmt.Errorf("parsing JSON: %w", err)
	}
	return &data, nil
}

// downloadAndParseTempsParole2022 télécharge les CSVs Arcom et agrège le temps de parole par candidat
func downloadAndParseTempsParole2022(config *Config) (map[string]int, error) {
	totals := make(map[string]int)

	// Créer le répertoire data s'il n'existe pas
	if err := os.MkdirAll("data", 0755); err != nil {
		return nil, fmt.Errorf("création répertoire data: %w", err)
	}

	for _, src := range config.Sources.TempsParole2022.CSVURLs {
		fmt.Printf("  Téléchargement: %s\n", src.Periode)
		
		// Générer un nom de fichier à partir de la période
		filename := strings.ReplaceAll(strings.ToLower(src.Periode), " ", "_")
		filename = strings.ReplaceAll(filename, "à", "a")
		filename = strings.ReplaceAll(filename, "é", "e")
		filepath := fmt.Sprintf("data/%s.csv", filename)
		
		records, err := downloadAndSaveCSV(src.URL, filepath)
		if err != nil {
			return nil, fmt.Errorf("CSV %s: %w", src.Periode, err)
		}

		for _, record := range records {
			if len(record) < 11 {
				continue
			}
			typeTemps := record[3]
			if typeTemps != "Total Temps de parole" {
				continue
			}
			candidat := record[2]
			// Sommer les durées des 4 tranches horaires (colonnes 4, 6, 8, 10)
			for _, idx := range []int{4, 6, 8, 10} {
				if idx < len(record) {
					secs := parseDuration(record[idx])
					totals[candidat] += secs
				}
			}
		}
	}

	return totals, nil
}

// downloadAndSaveCSV télécharge un fichier CSV, le sauvegarde et retourne les lignes parsées
func downloadAndSaveCSV(url string, filepath string) ([][]string, error) {
	client := &http.Client{Timeout: 60 * time.Second}
	resp, err := client.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("HTTP %d", resp.StatusCode)
	}

	// Lire tout le contenu
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("lecture body: %w", err)
	}

	// Sauvegarder le fichier
	if err := os.WriteFile(filepath, body, 0644); err != nil {
		return nil, fmt.Errorf("sauvegarde fichier: %w", err)
	}
	fmt.Printf("    → Sauvegardé: %s (%d octets)\n", filepath, len(body))

	// Les CSVs Arcom sont en Latin-1, conversion vers UTF-8
	reader := charmap.ISO8859_1.NewDecoder().Reader(strings.NewReader(string(body)))

	csvReader := csv.NewReader(reader)
	csvReader.Comma = ';'
	csvReader.LazyQuotes = true

	var records [][]string
	// Skip header
	_, err = csvReader.Read()
	if err != nil {
		return nil, fmt.Errorf("lecture header: %w", err)
	}

	for {
		record, err := csvReader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			continue // skip malformed lines
		}
		records = append(records, record)
	}

	return records, nil
}

// parseDuration convertit "HH:MM:SS" en secondes
func parseDuration(s string) int {
	s = strings.TrimSpace(s)
	if s == "" || s == "-" {
		return 0
	}
	parts := strings.Split(s, ":")
	if len(parts) != 3 {
		return 0
	}
	h, m, sec := 0, 0, 0
	fmt.Sscanf(parts[0], "%d", &h)
	fmt.Sscanf(parts[1], "%d", &m)
	fmt.Sscanf(parts[2], "%d", &sec)
	return h*3600 + m*60 + sec
}

// normalizeName supprime les accents, met en majuscules, et normalise les séparateurs
func normalizeName(s string) string {
	s = strings.ToUpper(s)
	// Décomposition Unicode (NFD) puis suppression des diacritiques
	result := make([]rune, 0, len(s))
	for _, r := range norm.NFD.String(s) {
		if !unicode.Is(unicode.Mn, r) { // Mn = Mark, nonspacing (accents)
			result = append(result, r)
		}
	}
	// Remplacer les traits d'union par des espaces
	return strings.ReplaceAll(string(result), "-", " ")
}

// matchTempsParole fait correspondre un nom du data.json avec les noms du CSV Arcom
func matchTempsParole(nomJSON string, tempsParole map[string]int) int {
	// Noms dans data.json: "MÉLENCHON Jean-Luc" / "PÉCRESSE Valérie"
	// Noms dans CSV:       "MELENCHON JEAN LUC"  / "PECRESSE VALERIE"
	nomNorm := normalizeName(nomJSON)

	// Chercher correspondance exacte après normalisation
	for k, v := range tempsParole {
		if normalizeName(k) == nomNorm {
			return v
		}
	}

	// Chercher correspondance par nom de famille
	parts := strings.Fields(nomNorm)
	if len(parts) > 0 {
		lastName := parts[0]
		for k, v := range tempsParole {
			if strings.HasPrefix(normalizeName(k), lastName+" ") {
				return v
			}
		}
	}

	return 0
}

// formatDuration formate des secondes en "XXj XXh XXm XXs"
func formatDuration(seconds int) string {
	if seconds == 0 {
		return "N/A"
	}
	d := seconds / 86400
	h := (seconds % 86400) / 3600
	m := (seconds % 3600) / 60
	s := seconds % 60
	if d > 0 {
		return fmt.Sprintf("%dj %02dh %02dm %02ds", d, h, m, s)
	}
	return fmt.Sprintf("%02dh %02dm %02ds", h, m, s)
}

func displayTable(results []CandidatResult) {
	// Trier par ratio décroissant
	sort.Slice(results, func(i, j int) bool {
		return results[i].Ratio > results[j].Ratio
	})

	fmt.Println()
	fmt.Printf("  %-28s │ %18s │ %12s │ %12s\n", "Candidat", "Temps de parole", "Voix", "Ratio (s/voix)")
	fmt.Println("  " + strings.Repeat("─", 28) + "─┼─" + strings.Repeat("─", 18) + "─┼─" + strings.Repeat("─", 12) + "─┼─" + strings.Repeat("─", 14))

	for _, r := range results {
		ratioStr := "N/A"
		if r.Ratio > 0 {
			ratioStr = fmt.Sprintf("%.4f", r.Ratio)
		}
		fmt.Printf("  %-28s │ %18s │ %12s │ %14s\n",
			r.Nom,
			formatDuration(r.TempsParoleSeconds),
			formatNumber(r.Voix),
			ratioStr,
		)
	}

	fmt.Println()
	fmt.Println("  Ratio = secondes de temps de parole / nombre de voix obtenues au 1er tour")
	fmt.Println("  Plus le ratio est élevé, plus le candidat a eu de temps de parole par voix obtenue.")
}

// formatNumber formate un nombre avec des espaces comme séparateur de milliers
func formatNumber(n int) string {
	s := fmt.Sprintf("%d", n)
	if len(s) <= 3 {
		return s
	}
	var result []byte
	for i, c := range s {
		if i > 0 && (len(s)-i)%3 == 0 {
			result = append(result, ' ')
		}
		result = append(result, byte(c))
	}
	return string(result)
}
