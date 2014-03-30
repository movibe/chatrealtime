 var socket = io.connect( 'http://localhost' );

 // Mensagem de Bem Vindo
 socket.on( 'welcome', function () {
 	$( '#updates' ).append( "<li>Bem vindo ao Chat</li>" );

 } );

 // Mensagem que o usuario entrou na sala
 socket.on( 'user in', function ( data ) {
 	$( '#updates' ).append( "<li>O usuário <strong>" + data.userid + "</strong> entrou no chat.</li>" );
 } );

 // Mensagem para o usuario que trocou de nome
 socket.on( 'changed name', function ( data ) {
 	$( '#updates' ).append( "<li>Seu nome foi alterado para <strong>" + data.nome + "</strong>.</li>" );
 } );

 // Mensagem para todos os outros usuarios
 socket.on( 'user changed name', function ( data ) {
 	$( '#updates' ).append( "<li>O usuário <strong>" + data.userid + "</strong> trocou de nome para <strong>" + data.nome + "</strong>.</li>" );
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

 } );