$(document).ready(function(){

   setInterval(function(){
    $('#Commander').animate({
        opacity: 0.7
    }, 500).animate({
        opacity: 1
    }, 500);
}, 2000);



    var total = 0;

    // cible UNIQUEMENT les produits 
    $('#produits .Sensembl input[type="submit"]').click(function(e){
        e.preventDefault();

        var bloc = $(this).closest('.Sensembl');

        var prixText = bloc.find('.prix').text();
        var prix = parseInt(prixText.replace(/\s/g, '').replace('FCFA',''));

        // condition pour  éviter qui'il ya deux zones identiques
        //if(bloc.find('.zone').length > 0){
          //  return;
       // }

        bloc.append(
            '<div class="zone">' +
            'Quantité : <input type="number" class="qte" value="1"min= "1"><br>' +
            'Coût : <span class="cout">' + prix + '</span> FCFA' +
            '</div>'
        );

        total += prix;
        $('#total').text("Total : " + total + " FCFA");
    });

      //changement quantité uniquement produits
   $('#produits').on('input', '.qte', function(){

      var bloc = $(this).closest('.Sensembl');

       var prixText = bloc.find('.prix').text();
       var prix = parseInt(prixText.replace(/\s/g, '').replace('FCFA',''));

       var qte = $(this).val();

       var ancien = parseInt(bloc.find('.cout').text());
      var nouveau = prix * qte;

       bloc.find('.cout').text(nouveau);

      total = total - ancien + nouveau;
     $('#total').text("Total : " + total + " FCFA");
    });


    

    $('#formulaire').on('submit', function(e){
        e.preventDefault();

        var nom = $('#nom').val().trim();
        var email = $('#email').val().trim();
        var message = $('#message').val().trim();

        // Vérification si toutes les informations sont correctes
        if(nom == "" || email == "" || message == ""){
            alert("Veuillez remplir tous les champs !");
            return;
        }

        // Cacher le formulaire
        $('#formulaire').hide();

        // Affichage 
        $('#affichage').html(`
            <h3>Confirmez vos informations :</h3>
            <p><strong>Nom et prénom :</strong> ${nom}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong> ${message}</p>
            <button id="confirmer">Confirmer</button>
            <button id="modifier">Modifier</button>
        `);
    });

    // Confirmer ses informations 
    $('#affichage').on('click', '#confirmer', function(){
        alert("Formulaire envoyé !");
        $('#formulaire')[0].reset();
        $('#affichage').empty();
        $('#formulaire').show();
    });

    // Modifier ses informatiobs
    $('#affichage').on('click', '#modifier', function(){
        $('#affichage').empty();
        $('#formulaire').show();
    });

});