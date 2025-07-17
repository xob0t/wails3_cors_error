package main

import (
	"fmt"
	"log"
)

type GreetService struct{}

// ProcessFrontendText handles text data sent via service call
func (g *GreetService) ProcessFrontendText(text string) map[string]any {
	log.Printf("Received text via service call: %d bytes", len(text))

	return map[string]any{
		"method":  "service",
		"size":    len(text),
		"status":  "success",
		"message": fmt.Sprintf("Processed %d bytes successfully via service call", len(text)),
	}
}
