 var socket = io.connect( 'http://localhost' );

 socket.on( 'welcome', function () {
 	$( '#updates' ).append( "<li>Bem vindo ao Chat</li>" );

 } );

 socket.on( 'user in', function ( data ) {
 	$( '#updates' ).append( "<li>O usuário <strong>" + data.userid + "</strong> entrou no chat.</li>" );
 } );