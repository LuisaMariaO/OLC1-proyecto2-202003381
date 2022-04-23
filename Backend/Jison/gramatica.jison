%{
	
    // author: Luisa María Ortíz Romero 1 semestre 2022
    var tmp = "";
%}
%lex
%options case-insensitive
//Tipos de dato
entero [0-9]+/!"."
doble [0-9]+"."[0-9]+ 
booleano "true" | "false" 
caracter "'"("\\'"|[^\'^\\^\"]|"\\\\"|"\\n"|"\\t"|"\\r"|"\\\"")"'"
%s cadena
%%

//simbolos o palabras reservadas

<INITIAL>["]    {
                    this.begin('cadena')
                }

<cadena>"\\\""    {
                    tmp= tmp +  yytext;
                }              

<cadena>[^"]    {
                    tmp= tmp +  yytext;
                }
<cadena>["]     {
                    
                    this.popState();
                    console.log("reconoci token <cadena> con lexema: "+tmp)
                    tmp=""
                    //return 'ER_cadena'
                }


\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

{entero} //return 'int'
{doble} //return 'double'
{booleano} //return 'boolean'
{caracter} //return 'char'
{cadena} //return 'string'



[ \r\t]+            {}
\n                  {}



<<EOF>>             return 'EOF'; 

.                   { 
                        console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); 
                    }
/lex

%left '||'
%left '&&'
%right '!'
%left '==' '!=' '<' '<=' '>' '>='
%left '+' '-'
%left '*' '/'
%left '^'
%right '-'

%start INIT

%%

INIT
	:  EOF { console.log("termine de analizar, recursiva por la derecha c:");}
;


