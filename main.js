'use strict';

$(() => {
  $('#btnSubmit').click(getWeather);
});

function getWeather(e) {
  e.preventDefault();

  let $city = $('#iptCity').val();
  $city = $city.replace(/ /g, "_");
  let $state = $('#iptState').val();

  $.get("http://api.wunderground.com/api/2ca5db5b449f0cb2/conditions/q/" + $state + "/" + $city + ".json")
    .done(data => {
      let $weather = $('#template').clone();
      $weather.removeAttr('id');
      $weather.find('#display_location').text(data.current_observation.display_location.full);
      $weather.find('#local_time_rfc822').text(data.current_observation.local_time_rfc822);
      $weather.find('#temperature_string').text(data.current_observation.temperature_string);
      $weather.find('#weather').text(data.current_observation.weather);
      $weather.find('#relative_humidity').text(data.current_observation.relative_humidity);
      $weather.find('#feelslike_string').text(data.current_observation.feelslike_string);
      $weather.find('#precip_today_string').text(data.current_observation.precip_today_string);
      $weather.find('#icon_url').attr('src', data.current_observation.icon_url);

      let $condition = (data.current_observation.weather).toLowerCase();
      let $feelslike = parseInt(data.current_observation.feelslike_string);
      let $precipitation = data.current_observation.precip_today_string;
      let noGoConditions = "snow sleet severe hurricane tornado heavy snow";
      let wetConditions = "rain thunderstorm thunderstorms drizzle mist";

      if (noGoConditions.includes($condition)) {
        let $top = $weather.find('#top');
        $top.css("display", "none");
        let $bottom = $weather.find('#bottom');
        $bottom.css("display", "none");
        $weather.find('#outfit').text("STAY INDOORS");
      } else {
        if ($precipitation > 0) {
          if (wetConditions.includes($condition)) {
            $weather.find('#umbrella').removeAttr('id');
            $weather.find('#imgUmbrella').css('display', 'unset');
            $weather.find('#shoes').text("Rain Boots");
            $weather.find('#imgShoes').attr('src', "../Images/rainboots.jpg");
            $weather.find('#bottom').text("Waterproof Slacks");
            $weather.find('#imgBottom').attr('src', "../Images/waterproof_slacks.jpg");

            if ($feelslike <= 32) {
              $weather.find('#top').text("Heavy Winter Jacket");
              $weather.find('#imgTop').attr('src', "../Images/winter_jacket.jpg");
            } else if ($feelslike >= 32 && $feelslike <= 70) {
              $weather.find('#top').text("Waterproof Raincoat");
              $weather.find('#imgTop').attr('src', "../Images/raincoat.jpg");
            } else if ($feelslike >= 70 && $feelslike <= 80) {
              $weather.find('#top').text("Light Raincoat");
              $weather.find('#imgTop').attr('src', "../Images/light_raincoat.jpg");
              $weather.find('#bottom').text("Light Sweats");
              $weather.find('#imgBottom').attr('src', "../Images/sweats.jpg");
              $weather.find('#shoes').text("Closed-toed Shoes");
              $weather.find('#imgShoes').attr('src', "../Images/closed_toed_shoes.jpg");
            } else {
              $weather.find('#top').text("Light Poncho");
              $weather.find('#imgTop').attr('src', "../Images/poncho.jpg");
              $weather.find('#bottom').text("Waterproof Shorts");
              $weather.find('#imgBottom').attr('src', "../Images/waterproof_shorts.jpg");
              $weather.find('#shoes').text("Closed-toed Shoes");
              $weather.find('#imgShoes').attr('src', "../Images/closed_toed_shoes.jpg");
            }
          }
        } else {
          if ($feelslike <= 32) {
            $weather.find('#top').text("Heavy Winter Jacket");
            $weather.find('#imgTop').attr('src', "../Images/winter_jacket.jpg");
            $weather.find('#bottom').text("Ski Pants");
            $weather.find('#imgBottom').attr('src', "../Images/ski_pants.jpg");
            $weather.find('#shoes').text("Boots");
            $weather.find('#imgShoes').attr('src', "../Images/boots.jpeg");
          } else if ($feelslike >= 32 && $feelslike <= 55) {
            $weather.find('#top').text("Heavy Jacket");
            $weather.find('#imgTop').attr('src', "../Images/winter_jacket.jpg");
            $weather.find('#bottom').text("Heavy Slacks");
            $weather.find('#imgBottom').attr('src', "../Images/slacks.jpg");
            $weather.find('#shoes').text("Boots");
            $weather.find('#imgShoes').attr('src', "../Images/boots.jpeg");
          } else if ($feelslike >= 55 && $feelslike <= 70) {
            $weather.find('#top').text("Sweater");
            $weather.find('#imgTop').attr('src', "../Images/sweater.jpg");
            $weather.find('#bottom').text("Jeans");
            $weather.find('#imgBottom').attr('src', "../Images/jeans.jpg");
            $weather.find('#shoes').text("Closed-toed Shoes");
            $weather.find('#imgShoes').attr('src', "../Images/closed_toed_shoes.jpg");
          } else if ($feelslike >= 70 && $feelslike <= 80) {
            $weather.find('#top').text("Light Sweater or Long Sleeve");
            $weather.find('#imgTop').attr('src', "../Images/long_sleeve.jpg");
            $weather.find('#bottom').text("Jeans");
            $weather.find('#imgBottom').attr('src', "../Images/jeans.jpg");
            $weather.find('#shoes').text("Sneakers");
            $weather.find('#imgShoes').attr('src', "../Images/closed_toed_shoes.jpg");
          } else if ($feelslike >= 80 && $feelslike <= 95) {
            $weather.find('#top').text("T-Shirt");
            $weather.find('#imgTop').attr('src', "../Images/tshirt.jpg");
            $weather.find('#bottom').text("Shorts");
            $weather.find('#imgBottom').attr('src', "../Images/shorts.jpeg");
            $weather.find('#shoes').text("Flip Flops");
            $weather.find('#imgShoes').attr('src', "../Images/flip_flops.jpeg");
          } else {
            $weather.find('#top').text("Tank Top, Shirtless, or Bikini");
            $weather.find('#imgTop').attr('src', "../Images/tank_top.jpg");
            $weather.find('#bottom').text("Shorts, Trunks, or Bikini");
            $weather.find('#imgBottom').attr('src', "../Images/trunks.jpg");
            $weather.find('#shoes').text("Flip Flops or No Shoes");
            $weather.find('#imgShoes').attr('src', "../Images/flip_flops.jpeg");
          }
        }
      }

      $('.card').append($weather);
    })
    .fail(err => {
      console.error("Error: ", err);
    })
}
