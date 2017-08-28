package str

func Or(a, b string) string {
	if a == "" {
		return b
	}
	return a
}

func OrBytes(a, b []byte) []byte {
	if len(a) == 0 {
		return b
	}
	return a
}
