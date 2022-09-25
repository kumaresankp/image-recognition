from fpdf import FPDF

pdf = FPDF()
pdf.add_page()
pdf.set_font('Arial',size = 12)
f = open('Marks.txt','r')
for x in f:
      pdf.cell(200,10,txt=x,ln=1,align='L')
      
pdf.output('Marks1.pdf')
print("Generated (from python)")
