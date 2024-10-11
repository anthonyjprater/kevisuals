const photoList = []

const portfolioItemB = document.querySelector('#portfolio-item-b')

const portfolioItemA = document.querySelector('#portfolio-item-a')

jQuery(window).on('load', function () {
  // HIDE PRELAODER
  $('.preloader').addClass('preloader-hidden')

  // SHOW/ANIMATE ANIMATION CONTAINER
  setTimeout(function () {
    $('.hero .animation-container').each(function () {
      var e = $(this)

      setTimeout(function () {
        e.addClass('run-animation')
      }, e.data('animation-delay'))
    })
  }, 900)
})

jQuery(document).ready(function ($) {
  'use strict'

  // INIT PARALLAX PLUGIN
  $('.hero .background-content.parallax-on').parallax({
    scalarX: 24,
    scalarY: 15,
    frictionX: 0.1,
    frictionY: 0.1,
  })

  // SCROLL TOP BUTTON
  $('.scroll-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 400)
    return false
  })

  // SCROLL REVEAL SETUP
  window.sr = ScrollReveal()
  sr.reveal('.scroll-animated-from-bottom', {
    duration: 600,
    delay: 500,
    origin: 'bottom',
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    distance: '20vh',
    viewFactor: 0.4,
    scale: 1,
    useDelay: 'onload',
  })

  // IMAGE CAROUSEL
  $('.image-carousel').owlCarousel({
    center: true,
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    responsive: {
      800: {
        items: 2,
      },
    },
  })

  // HERO/BUTTON ON SCROLL ANIMATING
  function onScrollAnimating() {
    var windowHeight = $('.hero').height(),
      frontContent = $('.hero .front-content'),
      backContent = $('.hero .background-content'),
      navigationButton = $('.navigation-button'),
      scrollOffset,
      calculatedOpacityFrontContent,
      calculatedScaleFrontContent,
      calculatedTranslateHeader,
      calculatedOpacityBackground

    function navigationButtonHide() {
      if (calculatedTranslateHeader <= 200) {
        navigationButton.css(
          'transform',
          'translateX(' + calculatedTranslateHeader + '%) translateY(-50%)'
        )
      } else if (scrollOffset > windowHeight) {
        navigationButton.css('transform', 'translateX(200%) translateY(-50%)')
      }
    }

    function frontContentMargin() {
      if (scrollOffset <= windowHeight) {
        frontContent.css('margin-top', scrollOffset)
      } else if (scrollOffset > windowHeight) {
        frontContent.css('margin-top', windowHeight)
      }
    }

    function frontContentOpacity() {
      if (calculatedOpacityFrontContent >= 0) {
        frontContent.css('opacity', calculatedOpacityFrontContent)
      } else if (scrollOffset > windowHeight) {
        frontContent.css('opacity', '0')
      }
    }

    function frontContentScale() {
      if (calculatedScaleFrontContent >= 0.4) {
        frontContent.css(
          'transform',
          'scale(' + calculatedScaleFrontContent + ')'
        )
      } else if (scrollOffset > windowHeight) {
        frontContent.css('transform', 'scale(0.6)')
      }
    }

    function backgroundOpacity() {
      if (calculatedOpacityBackground >= 0) {
        backContent.css('opacity', calculatedOpacityBackground)
      } else if (scrollOffset > windowHeight) {
        backContent.css('opacity', '0')
      }
    }

    function runStep() {
      scrollOffset = $(window).scrollTop()

      if (windowHeight > scrollOffset && scrollOffset >= 0) {
        calculatedTranslateHeader = (scrollOffset / windowHeight) * 650
        calculatedOpacityFrontContent = 1 - (scrollOffset / windowHeight) * 4.2
        calculatedScaleFrontContent = 1 - (scrollOffset / windowHeight) * 1.2
        calculatedOpacityBackground = 1 - (scrollOffset / windowHeight) * 1.4

        navigationButtonHide()
        frontContentMargin()
        frontContentOpacity()
        frontContentScale()
        backgroundOpacity()
      }
    }

    $(window).on('resize', function () {
      windowHeight = $('.hero').height()
    })

    $(window).scroll(function () {
      runStep()
    })

    runStep()
  }

  onScrollAnimating()
})

// ---Flickr Integration---

const fetchFlickrPhotosetPhotos = async (
  photosetId,
  userId,
  apiKey,
  page = 1
) => {
  const baseUrl = 'https://www.flickr.com/services/rest/'
  const method = 'flickr.photosets.getPhotos'
  const format = 'json'
  const extras = 'url_o' // Request the original image URL
  const perPage = 5 // Number of photos per page

  const url = `${baseUrl}?method=${method}&api_key=${apiKey}&photoset_id=${photosetId}&user_id=${userId}&format=${format}&nojsoncallback=1&per_page=${perPage}&page=${page}&extras=${extras}`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (data.stat !== 'ok') {
      throw new Error(`Flickr API error: ${data.message}`)
    }

    // Extract relevant information from each photo
    const photos = data.photoset.photo.map((photo) => ({
      id: photo.id,
      title: photo.title,
      originalUrl: photo.url_o,
      width: photo.width_o,
      height: photo.height_o,
    }))

    return {
      photos,
      page: data.photoset.page,
      pages: data.photoset.pages,
      total: data.photoset.total,
    }
  } catch (error) {
    console.error('Error fetching Flickr photoset photos:', error)
    throw error
  }
}

// Usage example:
const photosetId = '72177720321080892'
const userId = ''
const apiKey = ''

fetchFlickrPhotosetPhotos(photosetId, userId, apiKey)
  .then((result) => {
    console.log('Fetched photoset photos:', result.photos)
    result.photos.forEach((photo) => {
      photoList.push(photo.originalUrl)
      document.getElementById('portfolio-item-a').innerHTML =
        `
        <img class="img-responsive" src="${photo.originalUrl}" alt="image" load="lazy">
        ` + portfolioItemA.innerHTML
    })
    console.log(photoList)
    console.log(
      `Page ${result.page} of ${result.pages}, Total photos: ${result.total}`
    )
    // Process the photos here
  })
  .catch((error) => {
    console.error('Failed to fetch photoset photos:', error)
  })
