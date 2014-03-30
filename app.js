/**
 * Module dependencies.
 */

var express = require( 'express' );
var routes = require( './routes' );
var user = require( './routes/user' );
var http = require( 'http' );
var path = require( 'path' );

var app = express();

// all environments
app.set( 'port', process.env.PORT || 3000 );
app.set( 'views', path.join( __dirname, 'views' ) );
app.set( 'view engine', 'ejs' );
app.use( express.favicon() );
app.use( express.logger( 'dev' ) );
app.use( express.json() );
app.use( express.urlencoded() );
app.use( express.methodOverride() );
app.use( app.router );
app.use( require( 'stylus' ).middleware( path.join( __dirname, 'public' ) ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// development only
if ( 'development' == app.get( 'env' ) ) {
	app.use( express.errorHandler() );
}

app.get( '/', routes.index );
app.get( '/users', user.list );


// Coloca o Server em uma variavel
var server = http.createServer( app ).listen( app.get( 'port' ), function () {
	console.log( 'Express server listening on port ' + app.get( 'port' ) );
} );

var io = require( 'socket.io' ).listen( server );

io.sockets.on( 'connection', function ( socket ) {

	// Id do usuário
	var userid = socket.id;

	// Mostra mensagem para o usuario
	socket.emit( 'welcome' );

	// Mostra mensagem para todos os usuarios
	socket.broadcast.emit( 'user in', {
		userid: userid
	} );

	socket.on( 'change name', function ( data ) {
		// Variavel nome do input form
		var nome = data.nome;

		// Faz um set em username com o variavel nome
		socket.set( 'username', nome, function () {

			// Mensagem para o usuario que o nome dele foi alterado
			socket.emit( 'changed name', {
				nome: nome
			} );

			// Mensagem para todos os usuarios que o nome de outro foi alterado	
			socket.broadcast.emit( 'user changed name', {
				userid: userid,
				nome: nome
			} );


		} );

	} );

} );