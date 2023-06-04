$(document).ready(function() {
  const amenitiesChecked = {};

  $('input[type="checkbox"]').change(function() {
    const amenityId = $(this).attr('data-id');
    const amenityName = $(this).attr('data-name');

    if ($(this).is(':checked')) {
      amenitiesChecked[amenityId] = amenityName;
    } else {
      delete amenitiesChecked[amenityId];
    }

    const amenitiesList = Object.values(amenitiesChecked).join(', ');
    $('.amenities H4').text(amenitiesList);
  });

  const url = 'http://' + window.location.hostname + ':5001/api/v1/status/';
  $.get(url, function(data) {
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    data: '{}',
    contentType: 'application/json',
    dataType: 'json',
    success: function (data) {
      $('SECTION.places').append(data.map(place => {
        return `<ARTICLE>
                  <DIV class="title">
                    <H2>${place.name}</H2>
                    <DIV class="price_by_night">
                      ${place.price_by_night}
                    </DIV>
                  </DIV>
                  <DIV class="information">
                    <DIV class="max_guest">
                      <I class="fa fa-users fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.max_guest} Guests
                    </DIV>
                    <DIV class="number_rooms">
                      <I class="fa fa-bed fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_rooms} Bedrooms
                    </DIV>
                    <DIV class="number_bathrooms">
                      <I class="fa fa-bath fa-3x" aria-hidden="true"></I>
                      </BR>
                      ${place.number_bathrooms} Bathrooms
                    </DIV>
                  </DIV>
                  <DIV class="description">
                    ${place.description}
                  </DIV>
                </ARTICLE>`;
      }));
    }
  });
});
