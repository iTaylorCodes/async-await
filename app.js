// PART 1

async function numberFacts() {
  let favNumber = 13;
  let baseNumURL = "http://numbersapi.com";
  const $list = $("#facts");

  // 1.
  let res = await $.getJSON(`${baseNumURL}/${favNumber}?json`);
  console.log(res);

  // 2.
  let favNumbers = [7, 16, 24];
  let res2 = await $.getJSON(`${baseNumURL}/${favNumbers}?json`);
  console.log(res2);

  // 3.
  let facts = await Promise.all(
    Array.from({ length: 4 }, () =>
      $.getJSON(`${baseNumURL}/${favNumber}?json`)
    )
  );
  facts.forEach((data) => {
    $($list).append(`<li>${data.text}</li>`);
  });
}

numberFacts();

// PART 2

async function deckOfCards() {
  let baseCardURL = "http://deckofcardsapi.com/api/deck";

  // 1.
  let res = await $.getJSON(`${baseCardURL}/new/draw/`);
  console.log(`${res.cards[0].value} of ${res.cards[0].suit}`);

  // 2.
  let data = await $.getJSON(`${baseCardURL}/new/draw/`);
  let card1 = data.cards[0];
  let data2 = await $.getJSON(`${baseCardURL}/${data.deck_id}/draw/`);
  let card2 = data2.cards[0];
  console.log(`Card 1 is the ${card1.value} of ${card1.suit}`);
  console.log(`Card 2 is the ${card2.value} of ${card2.suit}`);

  // 3.
  let $btn = $("button");
  let $cardArea = $("#card-area");

  let deckData = await $.getJSON(`${baseCardURL}/new/shuffle/`);
  $btn.show().on("click", async function () {
    let cardData = await $.getJSON(`${baseCardURL}/${deckData.deck_id}/draw/`);
    let cardImg = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $("<img>", {
        src: cardImg,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`,
        },
      })
    );
    if (cardData.remaining === 0) $btn.remove();
  });
}

deckOfCards();
