

// Fonction qui affiche mon âge.
function getAge(date) { 
	var diff = Date.now() - date.getTime();
	var age = new Date(diff); 
	document.write(Math.abs(age.getUTCFullYear() - 1970));
}

// Fonction qui change la PDF
var images = new Array();
images.push("images/Geoffrey2.jpg");
images.push("images/geoffrey.jpg");
images.push("images/Mizuri.jpg");
 
var pointeur = 0;
 
function ChangerImage(){
document.getElementById("PDF").src = images[pointeur];
 
	if(pointeur < images.length-1){
		pointeur++;
	}
	else{
		pointeur = 0;
	}
 
	setTimeout("ChangerImage()", 5000)
}




//Code à exécuter une fois la page prête.
$(document).ready(function()
{
	//Chargement de la fonction permettant le changement auto de la photo de profil
	ChangerImage();
	
	//Mise en forme de l'onglet "Skills", ouvert par défaut
	$('#navS').css("background-color","#FFFFFF");
	
	//Ecoute de l'évenement click que la barre de navigation
    $('.nav').click(function() {
        $('.nav').css("background-color","");
		$(this).css("background-color","#FFFFFF");
        $('.cv').hide();
		$('svg.radial-progress').each(function( index, value ) { 
			$(this).find($('circle.complete')).removeAttr( 'style' );
		});
        $($(this).data('show')).show();
    });
	
	$('.isolator').hover(function() {
		//Display the caption
		$(this).find('div.caption').stop(false,true).fadeIn(200);
	},
	function() {
		//Hide the caption
		$(this).find('div.caption').stop(false,true).fadeOut(200);
	});

	if(window.matchMedia("(max-width:1000px)").matches) {
		$(window).scroll(function(){
			$('svg.radial-progress').each(function (index, value)
			{
				if (
					$(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
					$(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
				) {
					// Get percentage of progress
					percent = $(value).data('percentage');
					// Get radius of the svg's circle.complete
					radius = $(this).find($('circle.complete')).attr('r');
					// Get circumference (2πr)
					circumference = 2 * Math.PI * radius;
					// Get stroke-dashoffset value based on the percentage of the circumference
					strokeDashOffset = circumference - ((percent * circumference) / 100);
					// Transition progress for 1.25 seconds
					$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
				}
			})
		}).trigger('scroll');
	}
	else {
		$('section#cv').scroll(function() {
			$('svg.radial-progress').each(function (index, value)
			{
				if (
					$(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
					$(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
				) {
					// Get percentage of progress
					percent = $(value).data('percentage');
					// Get radius of the svg's circle.complete
					radius = $(this).find($('circle.complete')).attr('r');
					// Get circumference (2πr)
					circumference = 2 * Math.PI * radius;
					// Get stroke-dashoffset value based on the percentage of the circumference
					strokeDashOffset = circumference - ((percent * circumference) / 100);
					// Transition progress for 1.25 seconds
					$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
				}
			})
		}).trigger('scroll');
	}

	function beforePrint(){
		$('svg.radial-progress').each(function (index, value)
		{
				// Get percentage of progress
				percent = $(value).data('percentage');
				// Get radius of the svg's circle.complete
				radius = $(this).find($('circle.complete')).attr('r');
				// Get circumference (2πr)
				circumference = 2 * Math.PI * radius;
				// Get stroke-dashoffset value based on the percentage of the circumference
				strokeDashOffset = circumference - ((percent * circumference) / 100);
				// Transition progress for 1.25 seconds
				$(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
			})
		}

	if (window.matchMedia) {
		var mediaQueryList = window.matchMedia('print');
		mediaQueryList.addListener(function (mql) {
			if (mql.matches) {
				beforePrint();
			}
		});
	}

	window.onbeforeprint = beforePrint;
  
	var $slider = $('#slider'), //Ciblage du div Slider
		$img = $('.item'), //Ciblage des images du Slider
		indexImg = $img.length-1, //Définition de l'index du dernier élément
		i = 0, //Initialisatio du compteur
		$currentImg = $img.eq(i); //Ciblage de l'image courante, possédant l'index i
		
	$img.css('display', 'none'); //Toutes les images sont cachées
	$currentImg.css('display', 'block'); //Image courante est affichée.
	
	$slider.append('<div class="controls"> <span class="prev">Precedent</span> <span class="next">Suivant</span> </div>');
	
	$('.next').click(function(){ // image suivante

		i++; // on incrémente le compteur

		if( i > indexImg ){
			i = 0;
		}
		
		$img.css('display', 'none'); // on cache les images
		$currentImg = $img.eq(i); // on définit la nouvelle image
		$currentImg.css('display', 'block'); // puis on l'affiche
	});

	$('.prev').click(function(){ // image précédente

		i--; // on décrémente le compteur, puis on réalise la même chose que pour la fonction "suivante"

		if( i < 0 ){
			i = indexImg;
		}
		
		$img.css('display', 'none');
		$currentImg = $img.eq(i);
		$currentImg.css('display', 'block');

	});
	
	function slideImg(){
		setTimeout(function(){ // on utilise une fonction anonyme
							
			if(i < indexImg){ // si le compteur est inférieur au dernier index
			i++; // on l'incrémente
		}
		else{ // sinon, on le remet à 0 (première image)
			i = 0;
		}

		$img.css('display', 'none');

		$currentImg = $img.eq(i);
		$currentImg.css('display', 'block');

		slideImg(); // on oublie pas de relancer la fonction à la fin

		}, 10000); // on définit l'intervalle à 7000 millisecondes (7s)
	}
	
	slideImg(); //Appel de SlideImg
	
	$('.item').hover(function() {
		//Display the caption
		$(this).find('div.caption').stop(false,true).fadeIn(200);
	},
	function() {
		//Hide the caption
		$(this).find('div.caption').stop(false,true).fadeOut(200);
	});


});