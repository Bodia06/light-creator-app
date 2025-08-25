import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import * as XLSX from 'xlsx'

/**
 * Завантаження контенту як PDF
 * @param {HTMLElement} contentRef
 * @param {string} fileName
 */
export const downloadPDF = async (
  contentRef,
  fileName = 'konfiguracja.pdf'
) => {
  if (!contentRef) return

  const canvas = await html2canvas(contentRef, {
    scale: 2,
    useCORS: true,
    logging: false
  })

  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save(fileName)
}

/**
 * Завантаження контенту як Excel
 * @param {Array} selectedItems
 * @param {string} fileName
 */
export const downloadExcel = (
  selectedItems,
  fileName = 'konfiguracja.xlsx'
) => {
  const data = [
    ['Project informations:', 'Distributor informations:', '', '', '', ''],
    ['Project number', '', 'Company name', 'LOONARI sp. z o.o.', '', ''],
    ['Project name', '', 'Contact person', '', '', ''],
    [
      'Address',
      '',
      'Company address',
      'ul.Podmiejska 7, 41-940 Piekary Slaskie, Poland',
      '',
      ''
    ],
    ['Interior designer', '', 'Mail', 'hello@loonari.eu', '', ''],
    ['Your configuration:', '', 'Mobile', '+48 539-982-819', '', ''],
    ['', '', '', '', '', ''],
    [
      'Product name',
      'Product no.',
      'Configuration',
      'Quantity (pcs.)',
      'Price',
      'Total amount',
      'Comments'
    ]
  ]

  selectedItems.forEach(item => {
    const configuration = item.selectedValues
      .map((val, idx) => {
        const type = item.Type[idx]
        const typeName = type ? type.name : 'Nieznany typ'
        return `${typeName}: ${val}`
      })
      .join(', ')

    data.push([
      item.Name,
      item.productNo || '',
      configuration,
      item.count,
      '', // price
      '', // total
      ''
    ])
  })

  // Додаємо підсумки та інформацію про дистриб'ютора
  data.push(['', '', '', '', '', 'Total value', ''])
  data.push(['', '', '', '', '', '', ''])
  data.push([
    '',
    '',
    'LOONARI sp. z o.o.',
    'ul.Podmiejska 7',
    '41-940 Piekary Slaskie, Poland',
    '+48 539-982-819',
    'hello@loonari.eu'
  ])

  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Konfiguracja')

  ws['!cols'] = [
    { wch: 20 },
    { wch: 15 },
    { wch: 40 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 }
  ]

  XLSX.writeFile(wb, fileName)
}
