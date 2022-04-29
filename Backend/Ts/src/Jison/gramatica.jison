%{
	
    // author: Luisa María Ortíz Romero 1 semestre 2022
    var tmp = "";
    var num = "";
    const {Declaracion} = require ('../instruction/declaracion.ts');
    const {Type} = require('../symbol/type');
    const {Asignacion} = require('../instruction/asignacion');
    const {Arithmetic} = require('../expressions/aritmeticas');
    const {ArithmeticOption} = require('../expressions/arithmeticOption');
    const {Literal} = require ('../expressions/literal.ts')
    const {Access} = require('../expressions/access');
    const {Relational} = require ('../expressions/relacionales')
    const {RelationalOption} = require('../expressions/relationalOption')
    const {Logic} = require('../expressions/logicas')
    const {LogicOption} = require('../expressions/logicOption')
    const {If} = require('../instruction/if')
    const {Statement} = require('../instruction/statement');
    const {Print} = require('../instruction/print')
    const {Println} = require('../instruction/println')
    const {While} = require('../instruction/while')
    const {For} = require('../instruction/for')
    const {IncreDecre} = require('../expressions/increDecre')
    const {IncreDecreOption} = require('../expressions/increDecreOption')
    const {DoWhile} = require('../instruction/dowhile')
    const {Funcion} = require('../instruction/funcion')
    const {Call} = require('../instruction/call')
   
%}
%lex
%options case-insensitive
//Tipos de dato

booleano "true" | "false" 
caracter "'"("\\'"|[^\'^\\^\"]|"\\\\"|"\\n"|"\\t"|"\\r"|"\\\"")"'"
%s cadena
%s numeros
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


{booleano} return 'boolean'
{caracter} return 'char'

"++" return '++'
"--" return '--'
">=" return '>='
"," return ','
"==" return '=='
"=" return '='
";" return ';'
":" return ':'
"," return ','
"(" return '('
")" return ')'
"{" return '{'
"}" return '}'


"+" return '+'
"-" return '-'
"*" return '*'
"/" return '/'
"^" return '^'
"%" return '%'


"!=" return '!='
"<" return '<'
"<=" return '<='
">" return '>'
 

"||" return '||'
"&&" return '&&'
"!" return '!'

//Palabras reservadas
"int" return 'tint'
"double" return 'tdouble'
"boolean" return 'tboolean'
"char" return 'tchar'
"string" return 'tstring'
"if" return 'tif'
"else" return 'telse'
"print" return 'tprint'
"println" return 'tprintln'
"while" return 'twhile'
"for" return 'tfor'
"do" return 'tdo'
"void" return 'tvoid'
"return" return  'treturn'

([a-zA-Z])([a-zA-Z0-9_])* return 'id'

[0-9]+"."[0-9]+ return 'double'
[0-9]+ return 'int'


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
%left '^' '%'
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
    : DECLARACION ';' { $$=$1; }
    | ASIGNACION ';'  { $$=$1; }
    | IF              { $$=$1; }
    | PRINT           { $$=$1; }
    | PRINTLN         { $$=$1; }
    | WHILE           { $$=$1; }
    | FOR             { $$=$1; }
    | DOWHILE         { $$=$1; }
    | INCREDECRE ';'  { $$=$1; }
    | FUNCION         { $$=$1; }
    | CALL            { $$=$1; } 
;

IRETURN
    : 'treturn'
;

DECLARACION
    : TIPO  VARIABLES { $$= new Declaracion($1,$2,null,@1.first_line,@1.first_column)}
    | TIPO VARIABLES '=' EXPRESION  { $$= new Declaracion($1,$2,$4,@1.first_line,@1.first_column)}
  
;
ASIGNACION
    : 'id' '=' EXPRESION {$$= new Asignacion($1,$3,@1.first_line,@1.first_column)}
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

/*-------------------------------------CONTROL-------------------------------------*/
IF
    : 'tif' '(' EXPRESION ')' BLOQUE ELSE { $$ = new If($3, $5, $6, @1.first_line, @1.first_column);  }
;

BLOQUE
    : '{' INSTRUCCIONES '}' { $$ = new Statement($2         , @1.first_line, @1.first_column); }
    | '{'               '}' { $$ = new Statement(new Array(), @1.first_line, @1.first_column); }
;

ELSE
    : 'telse' BLOQUE { $$ = $2;   }
    | 'telse' IF     { $$ = $2;   }
    |                { $$ = null; }
;

/*----------------PRINT Y PRINTLN-------------*/

PRINT
    : 'tprint' '(' EXPRESION ')' ';' { $$ = new Print($3         , @1.first_line, @1.first_column); }
;

PRINTLN
    : 'tprintln' '(' EXPRESION ')' ';' { $$ = new Println($3         , @1.first_line, @1.first_column); }
;

/*-----------------CICLOS--------------------*/

WHILE
    : 'twhile' '(' EXPRESION ')' BLOQUE { $$ = new While($3,$5        , @1.first_line, @1.first_column); }
;

FOR
    : 'tfor' '(' CONDICION  ';' EXPRESION ';' ITERADOR ')' BLOQUE { $$=new For($3, $5, $7 , $9, @1.first_line, @1.first_column );   }
;
CONDICION
    : DECLARACION { $$=$1; }
    | ASIGNACION  { $$=$1; } 
;

ITERADOR
    : INCREDECRE { $$=$1; }
    | ASIGNACION { $$=$1; }
;

DOWHILE
    : 'tdo' BLOQUE 'twhile' '(' EXPRESION ')' ';' { $$ = new DoWhile($5,$2        , @1.first_line, @1.first_column); }
;


/*-----------------FUNCIONES-----------------*/
FUNCION
    : 'id' '('            ')' ':' 'tvoid' BLOQUE { $$ = new Funcion($1, $6, [], "void", @1.first_line, @1.first_column); }
    | 'id' '('            ')'             BLOQUE { $$ = new Funcion($1, $4, [], "void", @1.first_line, @1.first_column); }
    | 'id' '(' PARAMETROS ')' ':' 'tvoid' BLOQUE { $$ = new Funcion($1, $7, $3, "void", @1.first_line, @1.first_column); }
    | 'id' '(' PARAMETROS ')'             BLOQUE { $$ = new Funcion($1, $5, $3, "void", @1.first_line, @1.first_column); }
    | 'id' '('            ')' ':' TIPO    BLOQUE { $$ = new Funcion($1, $4, [], $5, @1.first_line, @1.first_column); }
    | 'id' '(' PARAMETROS ')' ':' TIPO    BLOQUE { $$ = new Funcion($1, $7, $3, $6, @1.first_line, @1.first_column); }
;

CALL 
    : 'id' '('           ')' ';' { $$ = new Call($1, [], @1.first_line, @1.first_column);  }
    | 'id' '(' VARIABLES ')' ';' { $$ = new Call($1, $3, @1.first_line, @1.first_column);  }
;

PARAMETROS
    : PARAMETROS ',' TIPO 'id' { $1.push($4+","+$3); $$ = $1;  }
    | TIPO 'id'               { $$ = [$2+","+$1];             }
;

/*-----------------EXPRESIONES----------------*/

INCREDECRE
    :    'id' '++'   { $$= new IncreDecre(IncreDecreOption.INCREMENTO,$1,@1.first_line,@2.first_column); }
    |    'id' '--'   { $$= new IncreDecre(IncreDecreOption.DECREMENTO,$1,@1.first_line,@2.first_column); }
;

EXPRESION
    : '-'  EXPRESION %prec UMENOS { $$ = new Arithmetic($2, $2, ArithmeticOption.NEGACION,        @1.first_line, @1.first_column); }
    |    'id' '--'   { $$= new IncreDecre(IncreDecreOption.DECREMENTO,$1,@1.first_line,@2.first_column); }
    |    'id' '++'   { $$= new IncreDecre(IncreDecreOption.INCREMENTO,$1,@1.first_line,@2.first_column); }

    | EXPRESION '+' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.SUMA            , @2.first_line, @2.first_column); }
    | EXPRESION '-' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.RESTA            , @2.first_line, @2.first_column); }
    | EXPRESION '*' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.MULTIPLICACION            , @2.first_line, @2.first_column); }
    | EXPRESION '/' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.DIVISION            , @2.first_line, @2.first_column); }
    | EXPRESION '^' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.POTENCIA            , @2.first_line, @2.first_column); }
    | EXPRESION '%' EXPRESION { $$ = new Arithmetic($1, $3, ArithmeticOption.MODULO            , @2.first_line, @2.first_column); }
    
    | EXPRESION '=='  EXPRESION { $$ = new Relational($1, $3, RelationalOption.IGUAL          , @2.first_line, @2.first_column); }
    | EXPRESION '!=' EXPRESION { $$ = new Relational($1, $3, RelationalOption.DIFERENTE     , @2.first_line, @2.first_column); }
    | EXPRESION '<'  EXPRESION { $$ = new Relational($1, $3, RelationalOption.MENOR         , @2.first_line, @2.first_column); }
    | EXPRESION '<=' EXPRESION { $$ = new Relational($1, $3, RelationalOption.MENORIGUAL     , @2.first_line, @2.first_column); }
    | EXPRESION '>' EXPRESION{ $$ = new Relational($1, $3, RelationalOption.MAYOR          , @2.first_line, @2.first_column); }
    | EXPRESION '>=' EXPRESION { $$ = new Relational($1, $3, RelationalOption.MAYORIGUAL , @2.first_line, @2.first_column); }
    
    
    | EXPRESION '&&' EXPRESION { $$ = new Logic($1, $3,LogicOption.AND  , @2.first_line, @2.first_column); }
    | EXPRESION '||' EXPRESION { $$ = new Logic($1, $3,LogicOption.OR   , @2.first_line, @2.first_column); }
    | '!' EXPRESION       { $$ = new Logic($2, $2,LogicOption.NOT  , @1.first_line, @1.first_column); }
    
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

