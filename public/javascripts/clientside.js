 var socket = io.connect( 'http://localhost' );
 socket.on( 'welcome', function ( data ) {
 	$( '#updates' ).append( "<li>Bem vindo ao Chat</li>" );

 } );