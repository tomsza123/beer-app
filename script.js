const apiurl =  "https://api.punkapi.com/v2/beers/ ";
var request = new XMLHttpRequest();
request.open('GET', apiurl, true);

/* 
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
 */
function findBeer(food)
{
    request.open('GET', apiurl, true);
    
    request.onload = function() 
    {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) 
        {
            data.forEach(beer => 
            {
                for(var i=0;i<beer.food_pairing.length;i++)
                {
                    if(beer.food_pairing[i] == food)
                    {
                        var modal = document.getElementById("modal_cont");

                        var div = document.createElement('div');
                        div.setAttribute("id", "modal");

                        var beer_name = document.createElement('div');
                        beer_name.setAttribute("id", "beer_name");

                        var close = document.createElement('button');
                        close.setAttribute("id", "close");
                        close.setAttribute("onclick", 'document.getElementById("modal").remove();document.getElementById("container").style.backgroundColor="";document.getElementById("container").style.opacity="";                        document.getElementsByTagName("table")[0].style="pointer-events: auto";                document.getElementsByTagName("body")[0].style.backgroundColor = "";');
                        
                        close.innerHTML = '&#10005;'

                        var img = document.createElement('div');
                        img.setAttribute("id", "img");

                        var description = document.createElement('div');
                        description.setAttribute("id", "description");

                        var food_title = document.createElement('div');
                        food_title.setAttribute("id", "food_title");

                        
                        img.innerHTML = '<img src="'+beer.image_url+'">';

                        beer_name.innerHTML = beer.name;
                        description.innerHTML = '<p>'+beer.description+'</p>';

                        food_title.innerHTML = food;

                        modal.appendChild(div);
                        div.appendChild(food_title);
                        div.appendChild(close);
                        div.appendChild(beer_name);
                        div.appendChild(img);
                        div.appendChild(description);
                        

                        document.getElementsByTagName("table")[0].style="pointer-events: none;";

                        document.getElementsByTagName("body")[0].style.backgroundColor = "rgba(0,0,0,.5)";

                        /*ingredients list*/
                        var ingr = document.createElement('div');
                        ingr.setAttribute("id", "ingr");

                        var malt = beer.ingredients.malt;
                        var hops = beer.ingredients.hops; 

                        ingr.innerHTML = '<b>Ingredients list:</b><br>'
                        ingr.innerHTML += '<b>Malt:</b><br>'

                        malt.forEach(function(element, index, array)
                        {
                            var num = index+1;
                            ingr.innerHTML += '<p>' + num +'. '+ beer.ingredients.malt[index].name+ ' - ' + beer.ingredients.malt[index].amount.value + " " +beer.ingredients.malt[index].amount.unit + '</p>';
                        })
                        ingr.innerHTML += '<b>Hops:</b><br>'
                        hops.forEach(function(element, index, array)
                        {
                            var num = index+1;

                            ingr.innerHTML += '<p>' + num +'. '+ beer.ingredients.hops[index].name+ ' - ' + beer.ingredients.hops[index].amount.value + " " +beer.ingredients.hops[index].amount.unit + '</p>';
                            
                            ingr.innerHTML += '<b>add</b> - '+beer.ingredients.hops[index].add + "</br><b>attribute</b> - " + beer.ingredients.hops[index].attribute+'</p>';

                        })
                        ingr.innerHTML += '<p><b>Yeast</b> - '+beer.ingredients.yeast;

                        div.appendChild(ingr);
                    }
                }
            })
        }
        else 
        {
            console.log('error')
        } 
    }
    request.send();
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
            }
        })
    } 
    else 
    {
        console.log('error')
    }
    function putToHtml(tab)
    {
        var test = document.getElementById('testdiv');
        var table = document.createElement('table');
        var tr = document.createElement('tr');
        
        table.appendChild(tr);
       
        for(var i=0;i<tab.length;i++)
        {
            var td = document.createElement('td');
            td.innerHTML = tab[i];
            td.setAttribute( 'onclick', 'findBeer("'+tab[i]+'")');
            tr.appendChild(td);
        }
        test.appendChild(table)
    }
    putToHtml(food_tab);
}
request.send();




