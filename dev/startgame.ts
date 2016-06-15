/// <reference path="player.ts"/>
/// <reference path="howler.d.ts"/>
/// <reference path="definitions/jquery.d.ts" />

/**
 * Startgame
 */
class Startgame {

    private player: Player;

    private score: HTMLElement;
    private startWrapper: HTMLElement;
    private startButton: HTMLElement;
    private startHighscore: HTMLElement;
    private startCredits: HTMLElement;
    private startHowToPlay: HTMLElement;
    private startScreen: HTMLElement;
    private startLogo: HTMLElement;
    public nameTextField: HTMLInputElement;
    public playerValue: String;

    private scoreScreen: HTMLElement;
    private backButton: HTMLElement;
    private screenInfo: HTMLElement;
    private highscoreText: HTMLElement;
    private playerScore: HTMLElement;
    
    private howToPlay: HTMLElement;
    private highscore: HTMLElement;
    private highscoreView: any;
    private soundTrue: boolean = true;

    // public xhttp: XMLHttpRequest;
    
constructor(soundTrue: boolean) {

    this.testjQuery();
    
    if(soundTrue == false){
        this.soundTrue = false;
    }
    
    if(this.soundTrue){
            var sound = new Howl({
                //urls: ["sound/intro/gameMusic1.mp3"],
                loop: true,
                sprite: {
                    intro: [0, 150000],
                }
            });
                sound.play('intro');
    }    

        //background startgame
        this.startScreen = document.createElement("beginscreen");
        this.startScreen.setAttribute("class", "startScreen");
        document.body.appendChild(this.startScreen);

        //wrapper for button and text field
        this.startWrapper = document.createElement("wrapper");
        this.startWrapper.setAttribute("id", "startWrapper");
        document.body.appendChild(this.startWrapper);

        //player input field
        this.nameTextField = document.createElement("input");
        this.nameTextField.setAttribute("class", "textfield");
        this.nameTextField.setAttribute("id", "playerInput");
        this.nameTextField.setAttribute("type", "text");
        this.nameTextField.setAttribute("value", "");
        this.nameTextField.setAttribute("placeholder", "Jouw naam");
        this.startWrapper.appendChild(this.nameTextField);

        //logo top startgame
        this.startLogo = document.createElement("logo");
        this.startLogo.setAttribute("class", "startLogo");
        this.startScreen.appendChild(this.startLogo);

        //main button with startgame
        this.startButton = document.createElement("button");
        this.startButton.setAttribute("id", "startButton");
        this.startButton.innerHTML = "Start game";
        this.startWrapper.appendChild(this.startButton);

        //smaller buttons below  main button
        this.startHighscore = document.createElement("button");
        this.startHighscore.setAttribute("id", "startHighscore");
        this.startWrapper.appendChild(this.startHighscore);
        this.startHighscore.addEventListener("click", this.highscoreScreen.bind(this));

        //smaller buttons below  main button
        this.startHowToPlay = document.createElement("button");
        this.startHowToPlay.setAttribute("id", "startHowToPlay");
        this.startWrapper.appendChild(this.startHowToPlay);
        this.startHowToPlay.addEventListener("click", this.HowToPlayScreen.bind(this));

        //smaller buttons below  main button
        this.startCredits = document.createElement("button");
        this.startCredits.setAttribute("id", "startCredits");
        this.startWrapper.appendChild(this.startCredits);
        this.startCredits.addEventListener("click", this.creditScreen.bind(this));

        this.startButton.addEventListener("click", this.createWorld.bind(this));
        
    }

    private createWorld() {
        this.playerValue = this.nameTextField.value;       
        // this.playerValue = this.nameTextField;
        //console.log(this.playerValue);
        $.post("include/names.php", { name: this.playerValue });

        // this.xhttp.open("GET", "names.php", true);
        // this.xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        // this.xhttp.send('?name='+this.playerValue);

        this.startScreen.remove();
        this.startWrapper.remove();
        new Level(1, "level1");
    }
    
    private highscoreScreen(){
        this.startLogo.remove();
        this.startScreen.remove();
        this.startWrapper.remove();
        this.highscoreView = new highscore();
    }

    private HowToPlayScreen() {
        this.startLogo.remove();
        this.startWrapper.remove();
    }

    private creditScreen() {
        this.startLogo.remove();
        this.startWrapper.remove();
        new CreditRoll();
    }

    private testjQuery(){
        console.log("start jquery testje");
        
        $.getJSON("js/test.json", (data) => this.finishedLoading(data));
    }

    private finishedLoading(data:any): void {
        console.log("json has loaded with jquery hooray");
        console.dir(data);
    }
}