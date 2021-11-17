var fantasma,fantasmaImagem
var fundo,fundoImagem
var portaImagem
var cercaImagem
var fantasma,fantasmaImagem,fantasmaImgPulo
var grupoPortas,grupoCerca,grupoBroquin
var estadoDoJoguin = "vamoSimbora"
var som
var textoDoInicio,textoDoInicioImg

function portas() {
  if(frameCount %100 === 0){
    var porta = createSprite(300,-50,40,50);
    var cerca = createSprite(300,10,40,50);
    var broco = createSprite(300,30,40,2);
    broco.width = cerca.width;
    broco.visible = false;
    porta.addImage(portaImagem);
    cerca.addImage(cercaImagem);
    porta.velocityY = 4;
    cerca.velocityY = 4;
    broco.velocityY = 4;
    porta.x = Math.round(random(100,500));
    cerca.x = porta.x;
    broco.x = cerca.x;
    porta.lifetime = 160;
    cerca.lifetime = 160;
    broco.lifetime = 160;
    grupoPortas.add(porta);
    grupoCerca.add(cerca);
    grupoBroquin.add(broco);
    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth+1;
  }
}

function preload(){
  fundoImagem = loadImage("tower.png");
  portaImagem = loadImage("door.png");
  cercaImagem = loadImage("climber.png");
  fantasmaImagem = loadImage("ghost-standing.png");
  som = loadSound("spooky.wav");
  textoDoInicioImg = loadImage("imagemtextoDoInicio.png");
  fantasmaImgPulo = loadImage("ghost-jumping,png");
}

function setup(){
  createCanvas (600,600)

  som.loop();

  fundo = createSprite(300,300,600,600);
  fundo.addImage(fundoImagem);

  fantasma = createSprite(300,300,40,40);
  fantasma.addImage(fantasmaImagem);
  fantasma.scale = 0.3;

  textoDoInicio = createSprite(300,200,50,50);
  textoDoInicio.addImage(textoDoInicioImg);
  textoDoInicio.scale = 0.2;
  textoDoInicio.visible = true;

  grupoPortas = new Group();
  grupoCerca = new Group();
  grupoBroquin = new Group();
}

function draw(){
  background ("black");

  if(estadoDoJoguin === "vamoSimbora"){
    if(keyDown("space")){
      estadoDoJoguin = "jogando";
    }
  } else if (estadoDoJoguin === "jogando"){
    fundo.velocityY = 3;

    textoDoInicio.visible = false;

    if(fundo.y >400){
      fundo.y = 300;
    }

    if(keyDown("space")){
      fantasma.velocityY = -5;
      fantasma.addImage(fantasmaImgPulo);
    }

    fantasma.velocityY = fantasma.velocityY + 0.3;

    if(keyDown("right")){
      fantasma.x = fantasma.x + 3;
    }

    if(keyDown("left")){
      fantasma.x = fantasma.x - 3;
    }

    portas();

    fantasma.collide(grupoCerca);

    if(fantasma.isTouching(grupoBroquin) || fantasma.y >600){
        fantasma.destroy();
        estadoDoJoguin = "emorreu"
    }
  } else {
      fundo.velocityY = 0;

      grupoCerca.destroyEach();
      grupoPortas.destroyEach();
      grupoBroquin.destroyEach();

      fundo.destroy();

      stroke("blue");
      strokeWeight(5);
      fill("red");
      textSize(80);
      text("FALICEU!",120,300);
  }

  drawSprites();
}

// alterar animação do fantasma quando estiver em cima da cerca
// aperte R para recomeçar (teste)