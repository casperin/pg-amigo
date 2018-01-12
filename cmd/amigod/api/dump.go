package api

import (
	"io"
	"net/http"
	"os"
	"os/exec"

	"github.com/go-chi/chi"
	"github.com/spf13/viper"
)

const BUF_LEN = 1024

func Dump(w http.ResponseWriter, r *http.Request) {
	dbName := chi.URLParam(r, "db")
	pgHost := viper.GetString("pg_host")
	pgUsername := viper.GetString("pg_username")
	pgPassword := viper.GetString("pg_password")

	cmd := exec.Command("pg_dump", "-U", pgUsername, "-h", pgHost, dbName)
	// Can we do this with stdin somehow? I couldn't make below work
	// cmd.Stdin = strings.NewReader(pgPassword)
	cmd.Env = append(os.Environ(), "PGPASSWORD="+pgPassword)

	pr, pw := io.Pipe()
	cmd.Stdout = pw
	cmd.Stderr = pw

	go writeCmdOutput(w, pr)

	cmd.Run()
	pw.Close()
}

func writeCmdOutput(w http.ResponseWriter, pr *io.PipeReader) {
	buffer := make([]byte, BUF_LEN)
	for {
		n, err := pr.Read(buffer)
		if err != nil {
			pr.Close()
			break
		}

		data := buffer[0:n]
		w.Write(data)
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
		//reset buffer
		for i := 0; i < n; i++ {
			buffer[i] = 0
		}
	}
}
