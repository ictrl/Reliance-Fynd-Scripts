//// convert OOS products to string
// const formateText = (arr) => {
//   let UI_text = "Remove these product from cart to checkout \n";
//   arr.forEach((element) => {
//     console.log;
//     UI_text = `${UI_text} ${element.product_title} ${element.variant} \n`;
//   });
//   return UI_text;
// };

//render header in storefront
// jQuery(document).ready(function () {
//   $("body").prepend(
//     '<div class="header" id="myHeader"><h2>Hola! Andaar se Bholla Bahar se BHEN KA L***</h2></div>'
//   );
//   $("head").prepend(
//     "<style>.header { padding: 10px 16px; background: #555; color: #f1f1f1;  text-align: center;} .content { padding: 16px; } .sticky { position: fixed; top: 0; width: 100%} .sticky + .content { padding-top: 102px; }</style>"
//   );

//   const header = document.getElementById("myHeader");
//   const sticky = header.offsetTop;

//   window.onscroll = function () {
//     if (window.pageYOffset > sticky) {
//       header.classList.add("sticky");
//     } else {
//       header.classList.remove("sticky");
//     }
//   };
// });
//cart details shopify api

const getCartDetails = () =>
  fetch("/cart.js")
    .then((response) => response.json())
    .then((data) => {
      console.log("carts", data.items);
      return data.items;
    });

//cart validation backend api
const cartValidation = (cart_items) =>
  fetch("https://fynd-mijito.herokuapp.com/cart/valid", {
    method: "POST",
    body: JSON.stringify({
      cart_items,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json);

//OOS validation
const OOSValidation = (arr) => {
  let result = [];
  arr.forEach((element) => {
    if (element.out_of_stock === true) {
      // result.push(`${element.product_title} - ${element.variant}`);
      result.push(element);
    }
  });
  return result;
};

const renderUI = (arr) => {
  if (arr.length != 0) {
    console.log("render remove item in respective div");
    return 400;
  } else return 200;
};

//checkout button handler
$(document).ready(function () {
  $(".cart__submit").click(async function (event) {
    event.preventDefault();
    const cartDetails = await getCartDetails();
    const validationResult = await cartValidation(cartDetails);
    const OOSResult = OOSValidation(validationResult);
    console.log({ OOSResult });
    const status = renderUI(OOSResult);
    console.log({ status });
    if (status == 200)  $('form').submit();
  });
});
