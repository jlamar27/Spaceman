

const pokemonArray = [
{name: 'Bulbasaur', hint: 'Grass/Poison'},
{name: 'Ivysaur', hint: 'Grass/Poison'},
{name: 'Venusaur', hint: 'Grass/Poison'},
{name: 'Charmander', hint: 'Fire'},
{name: 'Charmeleon', hint: 'Fire'},
{name: 'Charizard', hint: 'Fire/Flying'},
{name: 'Squirtle', hint: 'Water'},
{name: 'Wartortle', hint: 'Water'},
{name: 'Blastoise', hint: 'Water'},
{name: 'Caterpie', hint: 'Bug'},
{name: 'Metapod', hint: 'Bug'},
{name: 'Butterfree', hint: 'Bug/Flying'},
{name: 'Weedle', hint: 'Bug/Poison'},
{name: 'Kakuna', hint: 'Bug/Poison'},
{name: 'Beedrill', hint: 'Bug/Poison'},
{name: 'Pidgey', hint: 'Normal/Flying'},
{name: 'Pidgeotto', hint: 'Normal/Flying'},
{name: 'Pidgeot', hint: 'Normal/Flying'},
{name: 'Rattata', hint: 'Normal'},
{name: 'Raticate', hint: 'Normal'},
{name: 'Spearow', hint: 'Normal/Flying'},
{name: 'Fearow', hint: 'Normal/Flying'},
{name: 'Ekans', hint: 'Poison'},
{name: 'Arbok', hint: 'Poison'},
{name: 'Pikachu', hint: 'Electric'},
{name: 'Raichu', hint: 'Electric'},
{name: 'Sandshrew', hint: 'Ground'},
{name: 'Sandslash', hint: 'Ground'},
{name: 'Nidoran', hint: 'Poison'},
{name: 'Nidorina', hint: 'Poison'},
{name: 'Nidoqueen', hint: 'Poison/Ground'},
{name: 'Nidoran', hint: 'Poison'},
{name: 'Nidorino', hint: 'Poison'},
{name: 'Nidoking', hint: 'Poison/Ground'},
{name: 'Clefairy', hint: 'Fairy'},
{name: 'Clefable', hint: 'Fairy'},
{name: 'Vulpix', hint: 'Fire'},
{name: 'Ninetales', hint: 'Fire'},
{name: 'Jigglypuff', hint: 'Normal/Fairy'},
{name: 'Wigglytuff', hint: 'Normal/Fairy'},
{name: 'Zubat', hint: 'Poison/Flying'},
{name: 'Golbat', hint: 'Poison/Flying'},
{name: 'Oddish', hint: 'Grass/Poison'},
{name: 'Gloom', hint: 'Grass/Poison'},
{name: 'Vileplume', hint: 'Grass/Poison'},
{name: 'Paras', hint: 'Bug/Grass'},
{name: 'Parasect', hint: 'Bug/Grass'},
{name: 'Venonat', hint: 'Bug/Poison'},
{name: 'Venomoth', hint: 'Bug/Poison'},
{name: 'Diglett', hint: 'Ground'},
{name: 'Dugtrio', hint: 'Ground'},
{name: 'Meowth', hint: 'Normal'},
{name: 'Persian', hint: 'Normal'},
{name: 'Psyduck', hint: 'Water'},
{name: 'Golduck', hint: 'Water'},
{name: 'Mankey', hint: 'Fighting'},
{name: 'Primeape', hint: 'Fighting'},
{name: 'Growlithe', hint: 'Fire'},
{name: 'Arcanine', hint: 'Fire'},
{name: 'Poliwag', hint: 'Water'},
{name: 'Poliwhirl', hint: 'Water'},
{name: 'Poliwrath', hint: 'Water/Fighting'},
{name: 'Abra', hint: 'Psychic'},
{name: 'Kadabra', hint: 'Psychic'},
{name: 'Alakazam', hint: 'Psychic'},
{name: 'Machop', hint: 'Fighting'},
{name: 'Machoke', hint: 'Fighting'},
{name: 'Machamp', hint: 'Fighting'},
{name: 'Bellsprout', hint: 'Grass/Poison'},
{name: 'Weepinbell', hint: 'Grass/Poison'},
{name: 'Victreebel', hint: 'Grass/Poison'},
{name: 'Tentacool', hint: 'Water/Poison'},
{name: 'Tentacruel', hint: 'Water/Poison'},
{name: 'Geodude', hint: 'Rock/Ground'},
{name: 'Graveler', hint: 'Rock/Ground'},
{name: 'Golem', hint: 'Rock/Ground'},
{name: 'Ponyta', hint: 'Fire'},
{name: 'Rapidash', hint: 'Fire'},
{name: 'Slowpoke', hint: 'Water/Psychic'},
{name: 'Slowbro', hint: 'Water/Psychic'},
{name: 'Magnemite', hint: 'Electric/Steel'},
{name: 'Magneton', hint: 'Electric/Steel'},
{name: 'Farfetchd', hint: 'Normal/Flying'},
{name: 'Doduo', hint: 'Normal/Flying'},
{name: 'Dodrio', hint: 'Normal/Flying'},
{name: 'Seel', hint: 'Water'},
{name: 'Dewgong', hint: 'Water/Ice'},
{name: 'Grimer', hint: 'Poison'},
{name: 'Muk', hint: 'Poison'},
{name: 'Shellder', hint: 'Water'},
{name: 'Cloyster', hint: 'Water/Ice'},
{name: 'Gastly', hint: 'Ghost/Poison'},
{name: 'Haunter', hint: 'Ghost/Poison'},
{name: 'Gengar', hint: 'Ghost/Poison'},
{name: 'Onix', hint: 'Rock/Ground'},
{name: 'Drowzee', hint: 'Psychic'},
{name: 'Hypno', hint: 'Psychic'},
{name: 'Krabby', hint: 'Water'},
{name: 'Kingler', hint: 'Water'},
{name: 'Voltorb', hint: 'Electric'},
{name: 'Electrode', hint: 'Electric'},
{name: 'Exeggcute', hint: 'Grass/Psychic'},
{name: 'Exeggutor', hint: 'Grass/Psychic'},
{name: 'Cubone', hint: 'Ground'},
{name: 'Marowak', hint: 'Ground'},
{name: 'Hitmonlee', hint: 'Fighting'},
{name: 'Hitmonchan', hint: 'Fighting'},
{name: 'Lickitung', hint: 'Normal'},
{name: 'Koffing', hint: 'Poison'},
{name: 'Weezing', hint: 'Poison'},
{name: 'Rhyhorn', hint: 'Ground/Rock'},
{name: 'Rhydon', hint: 'Ground/Rock'},
{name: 'Chansey', hint: 'Normal'},
{name: 'Tangela', hint: 'Grass'},
{name: 'Kangaskhan', hint: 'Normal'},
{name: 'Horsea', hint: 'Water'},
{name: 'Seadra', hint: 'Water'},
{name: 'Goldeen', hint: 'Water'},
{name: 'Seaking', hint: 'Water'},
{name: 'Staryu', hint: 'Water'},
{name: 'Starmie', hint: 'Water/Psychic'},
{name: 'MrMime', hint: 'Psychic/Fairy'},
{name: 'Scyther', hint: 'Bug/Flying'},
{name: 'Jynx', hint: 'Ice/Psychic'},
{name: 'Electabuzz', hint: 'Electric'},
{name: 'Magmar', hint: 'Fire'},
{name: 'Pinsir', hint: 'Bug'},
{name: 'Tauros', hint: 'Normal'},
{name: 'Magikarp', hint: 'Water'},
{name: 'Gyarados', hint: 'Water/Flying'},
{name: 'Lapras', hint: 'Water/Ice'},
{name: 'Ditto', hint: 'Normal'},
{name: 'Eevee', hint: 'Normal'},
{name: 'Vaporeon', hint: 'Water'},
{name: 'Jolteon', hint: 'Electric'},
{name: 'Flareon', hint: 'Fire'},
{name: 'Porygon', hint: 'Normal'},
{name: 'Omanyte', hint: 'Rock/Water'},
{name: 'Omastar', hint: 'Rock/Water'},
{name: 'Kabuto', hint: 'Rock/Water'},
{name: 'Kabutops', hint: 'Rock/Water'},
{name: 'Aerodactyl', hint: 'Rock/Flying'},
{name: 'Snorlax', hint: 'Normal'},
{name: 'Articuno', hint: 'Ice/Flying'},
{name: 'Zapdos', hint: 'Electric/Flying'},
{name: 'Moltres', hint: 'Fire/Flying'},
{name: 'Dratini', hint: 'Dragon'},
{name: 'Dragonair', hint: 'Dragon'},
{name: 'Dragonite', hint: 'Dragon/Flying'},
{name: 'Mewtwo', hint: 'Psychic'},
{name: 'Mew', hint: 'Psychic'}
]


export { pokemonArray};