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
