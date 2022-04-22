%{
	
    // author: Luisa María Ortíz Romero 1 semestre 2022
%}
%lex

%%

//simbolos o palabras reservadas

\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas


[ \r\t]+            {}
\n                  {}



<<EOF>>             return 'EOF'; 

.                   { 
                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
                    }
/lex


%start INIT

%%

INIT
	:  EOF { console.log("termine de analizar, recursiva por la derecha c:");}
;


