class Tateti 
{
    constructor() 
    {
        this.sections = new Array(9);
    }

    updateDisplay(section) 
    {
        if(section.classList.contains('circle') == false && section.classList.contains('cross') == false) 
        {
            section.classList.add('cross');
            if(this.checkForWinner('cross') == false) //VERIFICO QUE CRUZ NO HAYA GANADO
            {
                if(this.checkForTie() == false) 
                {
                    this.computerMove();
                    if(this.checkForWinner('circle'))
                    {
                        this.winner('circulo');
                    }
                    else
                    {
                        if(this.checkForTie())
                        {
                            this.tie();
                        }
                    }
                }
                else
                {
                    this.tie();
                }
            }
            else
            {
                this.winner('cruz'); 
            }
        }
    }

    winner(name) 
    {
        setTimeout(function() {
            alert("ganador " + name);
            let sections = new Array(9);
            for(let i = 0; i < 9; i++) 
            {
                sections[i] = document.getElementById(i+1);
                sections[i].classList.remove('cross');
                sections[i].classList.remove('circle');
            }
        }, 100);
    }

    tie()
    {
        setTimeout(function() {
            alert("empate");
            let sections = new Array(9);
            for(let i = 0; i < 9; i++) 
            {
                sections[i] = document.getElementById(i+1);
                sections[i].classList.remove('cross');
                sections[i].classList.remove('circle');
            }
        }, 100);
    }

    checkForTie() 
    {
        let counter = 0;
        this.updateSections();
        this.sections.forEach(section => {
            if(section.classList.contains('circle') || section.classList.contains('cross')) 
            {
                counter++;
            }
        });

        return counter == 9;
    }    

    computerMove() 
    {
        let aux = false;
        this.updateSections();

        do 
        {
            let index = Math.floor((Math.random() * 8) + 0);
            if(this.sections[index].classList.contains('circle') == false && this.sections[index].classList.contains('cross') == false) 
            {
                this.sections[index].classList.add('circle');
                aux = true;
            }
        } while (aux == false);
    }

    updateSections()
    {
        for(let i = 0; i < 9; i++) 
        {
            this.sections[i] = document.getElementById(i+1);
        }
    }

    checkForWinner(className) 
    {
        return this.checkSectors(className);
    }

    checkSectors(className) 
    {
        let match = false;
        this.updateSections();
        //FILAS
        if(this.sections[0].classList.contains(className) && this.sections[1].classList.contains(className) && this.sections[2].classList.contains(className)) 
        {
            match = true;
        }

        if(this.sections[3].classList.contains(className) && this.sections[4].classList.contains(className) && this.sections[5].classList.contains(className)) 
        {
            match = true;
        }

        if(this.sections[6].classList.contains(className) && this.sections[7].classList.contains(className) && this.sections[8].classList.contains(className)) 
        {
            match = true;
        }

        //COLUMNAS
        if(this.sections[0].classList.contains(className) && this.sections[3].classList.contains(className) && this.sections[6].classList.contains(className)) 
        {
            match = true;
        }

        if(this.sections[1].classList.contains(className) && this.sections[4].classList.contains(className) && this.sections[7].classList.contains(className)) 
        {
            match = true;
        }

        if(this.sections[2].classList.contains(className) && this.sections[5].classList.contains(className) && this.sections[8].classList.contains(className)) 
        {
            match = true;
        }

        //DIAGONALES
        if(this.sections[0].classList.contains(className) && this.sections[4].classList.contains(className) && this.sections[8].classList.contains(className)) 
        {
            match = true;
        }

        if(this.sections[2].classList.contains(className) && this.sections[4].classList.contains(className) && this.sections[6].classList.contains(className)) 
        {
            match = true;
        }

        return match;
    }
}

const tateti = new Tateti();
const sections = document.querySelectorAll('button');

sections.forEach(section => {
    section.addEventListener('click', () => {
        tateti.updateDisplay(section);
    })
});