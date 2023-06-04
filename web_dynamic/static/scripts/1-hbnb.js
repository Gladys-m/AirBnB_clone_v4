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
});
