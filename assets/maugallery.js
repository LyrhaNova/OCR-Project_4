function createRowWrapper(t) {
  t.children().first().hasClass("row") ||
    t.append('<div class="gallery-items-row row"></div>');
}
function wrapItemInColumn(t, e) {
  if (e.constructor === Number)
    t.wrap(`<div class='item-column mb-4 col-${Math.ceil(12 / e)}'></div>`);
  else if (e.constructor === Object) {
    var a = "";
    e.xs && (a += ` col-${Math.ceil(12 / e.xs)}`),
      e.sm && (a += ` col-sm-${Math.ceil(12 / e.sm)}`),
      e.md && (a += ` col-md-${Math.ceil(12 / e.md)}`),
      e.lg && (a += ` col-lg-${Math.ceil(12 / e.lg)}`),
      e.xl && (a += ` col-xl-${Math.ceil(12 / e.xl)}`),
      t.wrap(`<div class='item-column mb-4${a}'></div>`);
  } else
    console.error(
      `Columns should be defined as numbers or objects. ${typeof e} is not supported.`
    );
}
function moveItemInRowWrapper(t) {
  t.appendTo(".gallery-items-row");
}

function responsiveImageItem(t) {
  "IMG" === t.prop("tagName") && t.addClass("img-fluid");
}
function openLightBox(t, e) {
  $(`#${e}`).find(".lightboxImage").attr("src", t.attr("src")),
    $(`#${e}`).modal("toggle");
}

// Détermine l'image actuelle, suivante ou précédente en fonction de la direction donnée
function changeImage(direction) {
  let currentImage = null;
  // Parcourt toutes les images de la gallerie
  $("img.gallery-item").each(function () {
    if ($(this).attr("src") === $(".lightboxImage").attr("src")) {
      currentImage = $(this);
    }
  });

  let activeTag = $(".tags-bar span.active-tag").data("images-toggle"),
    imagesArray = [];

  if (activeTag === "all") {
    $(".item-column").each(function () {
      if ($(this).children("img").length) {
        imagesArray.push($(this).children("img"));
      }
    });
  } else {
    $(".item-column").each(function () {
      if ($(this).children("img").data("gallery-tag") === activeTag) {
        imagesArray.push($(this).children("img"));
      }
    });
  }

  let currentIndex = 0;
  $(imagesArray).each(function (index) {
    if ($(currentImage).attr("src") === $(this).attr("src")) {
      currentIndex = index;
    }
  });

  // Calcul en fonction de la direction
  let newIndex;
  if (direction === "prev") {
    // On utilise l'opérateur modulo % pour boucler correctement dans le tableau
    // -> permet de continuer la boucle même au début ou à la fin du tableau
    newIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
  } else if (direction === "next") {
    newIndex = (currentIndex + 1) % imagesArray.length;
  }
  // Mise à jour de la lightbox
  // newImage correspond à la nouvelle image du nouvel index
  let newImage = imagesArray[newIndex];
  $(".lightboxImage").attr("src", $(newImage).attr("src"));
}

function prevImage(t) {
  changeImage("prev");
}

function nextImage(t) {
  changeImage("next");
}

function createLightBox(t, e, a) {
  t.append(`<div class="modal fade" id="${
    e || "galleryLightbox"
  }" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        ${
                          a
                            ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                            : '<span style="display:none;" />'
                        }
                        <img class="lightboxImage img-fluid" alt="Contenu de l'image affich\xe9e dans la modale au clique"/>
                        ${
                          a
                            ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                            : '<span style="display:none;" />'
                        }
                    </div>
                </div>
            </div>
        </div>`);
}
// Génération des boutons de filtres
function showItemTags(t, e, a) {
  var i =
    '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
  $.each(a, function (t, e) {
    i += `<li class="nav-item active">
            <span class="nav-link"  data-images-toggle="${e}">${e}</span></li>`;
  });
  var l = `<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;
  "bottom" === e
    ? t.append(l)
    : "top" === e
    ? t.prepend(l)
    : console.error(`Unknown tags position: ${e}`);
}
function filterByTag() {
  if (!$(this).hasClass("active-tag")) {
    $(".active-tag").removeClass("active active-tag"),
      $(this).addClass("active active-tag");
    var t = $(this).data("images-toggle");
    $(".gallery-item").each(function () {
      $(this).parents(".item-column").hide(),
        "all" === t
          ? $(this).parents(".item-column").show(300)
          : $(this).data("gallery-tag") === t &&
            $(this).parents(".item-column").show(300);
    });
  }
}
// Fonction générale
!(function (t) {
  (t.fn.mauGallery = function (e) {
    e = t.extend(t.fn.mauGallery.defaults, e);
    var a = [];
    return this.each(function () {
      t.fn.mauGallery.methods.createRowWrapper(t(this)),
        e.lightBox &&
          t.fn.mauGallery.methods.createLightBox(
            t(this),
            e.lightboxId,
            e.navigation
          ),
        t.fn.mauGallery.listeners(e),
        t(this)
          .children(".gallery-item")
          .each(function (i) {
            t.fn.mauGallery.methods.responsiveImageItem(t(this)),
              t.fn.mauGallery.methods.moveItemInRowWrapper(t(this)),
              t.fn.mauGallery.methods.wrapItemInColumn(t(this), e.columns);
            var l = t(this).data("gallery-tag");
            e.showTags && void 0 !== l && -1 === a.indexOf(l) && a.push(l);
          }),
        e.showTags &&
          t.fn.mauGallery.methods.showItemTags(t(this), e.tagsPosition, a),
        t(this).fadeIn(500);
    });
  }),
    (t.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    (t.fn.mauGallery.listeners = function (e) {
      t(".gallery-item").on("click", function () {
        e.lightBox &&
          "IMG" === t(this).prop("tagName") &&
          t.fn.mauGallery.methods.openLightBox(t(this), e.lightboxId);
      }),
        t(".gallery").on("click", ".nav-link", function () {
          t.fn.mauGallery.methods.filterByTag.call(this);
        }),
        t(".gallery").on("click", ".mg-prev", function () {
          t.fn.mauGallery.methods.prevImage(e.lightboxId);
        }),
        t(".gallery").on("click", ".mg-next", function () {
          t.fn.mauGallery.methods.nextImage(e.lightboxId);
        });
    }),
    (t.fn.mauGallery.methods = {
      createRowWrapper: function (t) {
        createRowWrapper(t);
      },
      wrapItemInColumn: function (t, e) {
        wrapItemInColumn(t, e);
      },
      moveItemInRowWrapper: function (t) {
        moveItemInRowWrapper(t);
      },
      responsiveImageItem: function (t) {
        responsiveImageItem(t);
      },
      openLightBox: function (t, e) {
        openLightBox(t, e);
      },
      prevImage: function (t) {
        prevImage(t);
      },
      nextImage: function (t) {
        nextImage(t);
      },
      createLightBox: function (t, e, a) {
        createLightBox(t, e, a);
      },
      showItemTags: function (t, e, a) {
        showItemTags(t, e, a);
      },
      filterByTag: function () {
        filterByTag.call(this);
      },
    });
})(jQuery);
