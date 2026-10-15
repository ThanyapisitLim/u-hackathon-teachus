package config

import (
	"log"
	"os"
)

type Config struct {
	Port        string
	DatabaseURL string
	CORSOrigin  string
}

func Load() Config {
	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatal("DATABASE_URL is required (Supabase Postgres connection string)")
	}
	return Config{
		Port:        getenv("PORT", "8080"),
		DatabaseURL: dbURL,
		CORSOrigin:  getenv("CORS_ORIGIN", "http://localhost:3000"),
	}
}

func getenv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
