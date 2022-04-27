%{
	
    // author: Luisa María Ortíz Romero 1 semestre 2022
    var tmp = "";
    const {Declaracion} = require ('../instruction/declaracion.ts');
    const {Type} = require('../symbol/type');
    const {Arithmetic} = require('../expressions/aritmeticas');
    const {ArithmeticOption} = require('../expressions/arithmeticOption');
    const {Literal} = require ('../expressions/literal.ts')
    const {Access} = require('../expressions/access');
   
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
                    yytext=tmp;
                    tmp=""
                    return 'string'
                    
                    //return 'ER_cadena'
                }


\s+                   /* skip whitespace */
"//".*                              // comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/] // comentario multiple líneas

{entero} return 'int'
{doble} return 'double'
{booleano} return 'boolean'
{caracter} return 'char'


"," return ','
"=" return '='
";" return ';'
"+" return '+'
"," return ','
"int" return 'tint'
"double" return 'tdouble'
"boolean" return 'tboolean'
"char" return 'tchar'
"string" return 'tstring'

([a-zA-Z])([a-zA-Z0-9_])* return 'id'



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
%right '^' '%'
%right '-'

%start INIT

%%

INIT
	:  INSTRUCCIONES EOF { return $1;}
;
INSTRUCCIONES 
    : INSTRUCCIONES INSTRUCCION { $1.push($2); $$=$1; }
    |INSTRUCCION { $$=[$1]; }
;
INSTRUCCION
    : DECLARACION { $$=$1; }
;
DECLARACION
    : TIPO  VARIABLES ';'{ $$= new Declaracion($1,$2,null,@1.first_line,@1.first_column)}
    | TIPO VARIABLES '=' EXPRESION ';' { $$= new Declaracion($1,$2,$4,@1.first_line,@1.first_column)}
  
;
TIPO
    : 'tint'
    | 'tdouble'
    | 'tboolean'
    | 'tchar'
    | 'tstring'
;
VARIABLES
    : VARIABLES ',' 'id' { $1.push($3); $$ = $1;  }
    | 'id'               { $$ = [$1];             }
;


/*-----------------EXPRESIONES----------------*/
EXPRESION
    : EXPRESION '+' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.SUMA            , @2.first_line, @2.first_column); }
    | L {  $$ = $1; }
;

L
    : 'int'        {  $$ = new Literal($1,                   Type.INTEGER , @1.first_line, @1.first_column); }
    | 'double'     {  $$ = new Literal($1,                   Type.DOUBLE , @1.first_line, @1.first_column); }
    | 'boolean'    {  $$ = new Literal($1,                   Type.BOOLEAN , @1.first_line, @1.first_column); }
    | 'char'       {  $$ = new Literal($1,                   Type.CHAR , @1.first_line, @1.first_column); }
    | 'string'     {  $$ = new Literal($1,                   Type.STRING , @1.first_line, @1.first_column); }
    | 'id'         {  $$ = new Access($1,@1.first_line, @1.first_column);  }
;

