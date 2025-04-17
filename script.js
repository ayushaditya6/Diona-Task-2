const { jsPDF } = window.jspdf;

document.getElementById("progress-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  let summary = `<h3>Worker Progress Report Summary</h3><ul>`;
  formData.forEach((value, key) => {
    summary += `<li><strong>${key}:</strong> ${value}</li>`;
  });
  summary += `</ul>`;

  document.getElementById("confirmation-text").innerHTML = summary;
  document.getElementById("confirmation-text").style.display = "block";
  document.getElementById("download-pdf").style.display = "inline-block";

  form.style.display = "none";
});

document.getElementById("download-pdf").addEventListener("click", async () => {
  const doc = new jsPDF({ unit: "px", format: "a4" });
  const content = document.getElementById("pdf-content");

  await html2canvas(content, { scale: 2, useCORS: true }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const imgProps = doc.getImageProperties(imgData);
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    doc.addImage(imgData, "PNG", 20, 20, pdfWidth - 40, pdfHeight);
    doc.save("Worker_Progress_Report.pdf");
  });
});
