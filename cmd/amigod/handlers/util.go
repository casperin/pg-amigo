package handlers

import (
	"html/template"
	"log"
	"net/http"
	"path"
)

var (
	root        = path.Join("cmd", "amigod", "handlers")
	layoutTpl   = path.Join(root, "layout.html")
	errorTpl, _ = template.ParseFiles(layoutTpl, path.Join(root, "error.html"))
)

type Content map[string]interface{}

func serveError(w http.ResponseWriter, status int, wrong error) error {
	log.Printf("%d:\n", status)
	log.Println(wrong)
	return errorTpl.ExecuteTemplate(w, "html", Content{
		"status": status,
		"error":  wrong,
	})
}

func MustServeError(w http.ResponseWriter, status int, err error) {
	must(serveError(w, status, err))
}

func serve(w http.ResponseWriter, content Content, names ...string) error {
	var ns = make([]string, len(names)+1)
	ns[0] = layoutTpl
	for i, n := range names {
		ns[i+1] = path.Join(root, n+".html")
	}
	tpl, err := template.ParseFiles(ns...)
	if err != nil {
		return err
	}
	return tpl.ExecuteTemplate(w, "html", content)
}

func MustServe(w http.ResponseWriter, content Content, names ...string) {
	must(serve(w, content, names...))
}

func must(err error) {
	if err != nil {
		panic(err)
	}
}
