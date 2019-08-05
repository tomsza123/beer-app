const apiurl =  "https://api.punkapi.com/v2/beers/ ";
var request = new XMLHttpRequest()
request.open('GET', apiurl, true)

//$.getJSON(apiurl, function(data)

function removeDuplicates(tab)//do przejrzenia
{
    //pętla usuwająca powtarzające się dania zebrane z piw(tab musi byc posortowana)
    tab.sort();
    for(var i=0;i<tab.length;i++)
    {
        if(tab[i++]=tab[i])
        {
            tab.splice(i,1);
            i--;//wazna czesc kodu - po usunieciu petla musi wrócić na miejsce wczesniej zajmowane przez duplikat(bez tego petla pomija niektóre teoretyczne duplikaty)
        }
    }
}
function putToHtml(tab)
{
    for(var i=0;i<tab.length;i++)
    {
        document.write(tab[i] + "  " + i +"<br >");
    }
}

request.onload = function() 
{

    const food_tab = [];
    var beer_tab = [];
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) 
    {
        data.forEach(beer => 
        {
            beer_tab.push(beer.name);

            for(var i=0;i<beer.food_pairing.length;i++)
            {
                food_tab.push(beer.food_pairing[i]);
                //food_tab.push(beer.food_pairing[i]);
            }
        })
    } 
    else 
    {
        console.log('error')
    }
    
    function findBeer(food)
    {
        if (request.status >= 200 && request.status < 400) 
        {
            data.forEach(beer => 
            {
                for(var i=0;i<beer.food_pairing.length;i++)
                {
                    if(beer.food_pairing[i] == food)
                    {
                        console.log(beer.name);
                        console.log(beer.id)
                    }
                }
            })
        } 
        else 
        {
            console.log('error')
        }
    }


    putToHtml(food_tab);
    findBeer("Yuzu cheesecake");
      
}
request.send();

