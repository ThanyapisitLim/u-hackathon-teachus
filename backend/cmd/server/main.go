package main

import (
	"log"

	"u-hackathon/backend/internal/config"
	"u-hackathon/backend/internal/database"
	"u-hackathon/backend/internal/router"
)

func main() {
	cfg := config.Load()

	db, err := database.Open(cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("connect database: %v", err)
	}

	// db.AutoMigrate(&models.X{}) once models exist.

	if err := router.New(cfg, db).Run(":" + cfg.Port); err != nil {
		log.Fatalf("run server: %v", err)
	}
}
