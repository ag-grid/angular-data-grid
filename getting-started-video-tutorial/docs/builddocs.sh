cat pdf-metadata.md > angular-tutorial.md
cat newpage.md >> angular-tutorial.md
cat 00a-introduction.md >> angular-tutorial.md

cat newpage.md >> angular-tutorial.md
cat 001-quickstart-angular-ag-grid.md >> angular-tutorial.md

cat newpage.md >> angular-tutorial.md
cat 002-enterprise-edition.md >> angular-tutorial.md

cat newpage.md >> angular-tutorial.md
cat 003-cell-renderers.md >> angular-tutorial.md

cat newpage.md >> angular-tutorial.md
cat 999-outro.md >> angular-tutorial.md

pandoc angular-tutorial.md -o angular-tutorial-workbook.pdf --from markdown --template eisvogel --listings --toc
open angular-tutorial-workbook.pdf