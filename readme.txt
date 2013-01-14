1. în apl.xhtml s-a adăugat în head
	<script type="text/javascript" src="loadSal.js"> 
	Si s-a modificat tagul applet (vezi fișier alăturat)
	

2. în d112.xhtml se mofifică tagul xforms:submit cu  submission="DS112" (~linia 880) în xforms:trigger (vezi fișier alăturat)

3. în loadSal.js s-au creat două metode noi (vezi fișier alăturat)

4. în websal se crează un folder lib care conține wsd112.jar (vezi folder alăturat)

5. în home-ul userului care rulează appletul, se crează un folder decl_ro cu structura alăturată ( contine folderul dist care apare la instalarea aplicatiei ANAF, cu start.sh adăugat pentru ponire și aladdin.cfg din config modificat pentru versiunea linux)
