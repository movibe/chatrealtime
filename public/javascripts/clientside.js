 var socket = io.connect( 'http://localhost' );

 // Mensagem de Bem Vindo
 socket.on( 'welcome', function () {
 	$( '#chat ul' ).append( "<li>Bem vindo ao Chat</li>" );

 } );

 // Mensagem que o usuario entrou na sala
 socket.on( 'user in', function ( data ) {
 	$( '#chat ul' ).append( "<li>O usuário <strong>" + data.userid + "</strong> entrou no chat.</li>" );
 } );

 // Mensagem para o usuario que trocou de nome
 socket.on( 'changed name', function ( data ) {
 	$( '#chat ul' ).append( "<li>Seu nome foi alterado para <strong>" + data.nome + "</strong>.</li>" );
 } );

 // Mensagem para todos os outros usuarios
 socket.on( 'user changed name', function ( data ) {
 	$( '#chat ul' ).append( "<li>O usuário <strong>" + data.userid + "</strong> trocou de nome para <strong>" + data.nome + "</strong>.</li>" );
 } );

 socket.on( 'message sent', function ( data ) {
 	$( '#chat ul' ).append( "<li><strong>Eu: </strong> " + data.message + ".</li>" );
 } );

 socket.on( 'message sent by user', function ( data ) {
 	$( '#chat ul' ).append( "<li><strong>" + data.name + ": </strong> " + data.message + "</li>" );
 } );

 // jQuery
 $( function () {
 	// Submit do form altear nome
 	$( '#form-alterar-nome' ).submit( function () {

 		var nome = $( '#nome' ).val();

 		socket.emit( 'change name', {
 			nome: nome
 		} );

 		// Limpa o Campo de Nome
 		$( '#nome' ).val( "" );
 		return false;
 	} );

 	$( '#form-enviar-mensagem' ).submit( function () {
 		var mensagem = $( '#mensagem' ).val();

 		socket.emit( 'send message', {
 			message: mensagem
 		} );

 		// Limpa o campo mensagem depois que envia
 		$( '#mensagem' ).val( "" );

 		return false;
 	} );

 } );