import PDFParser from "pdf2json"; 

export async function extractTextFromPdfBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    const parser = new PDFParser()

    parser.on("pdfParser_dataError", (err) => reject(err.parserError))
    parser.on("pdfParser_dataReady", (pdfData) => {
      try {
        const text = pdfData?.Pages?.map((page: any) =>
          page.Texts.map((t: any) => decodeURIComponent(t.R[0].T)).join(" ")
        ).join("\n")

        resolve(text || "")
      } catch (err) {
        reject("Fehler beim Extrahieren von Text.")
      }
    })

    parser.parseBuffer(buffer)
  })
}
