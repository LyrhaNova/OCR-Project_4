function createRowWrapper(e) {
  e.children().first().hasClass("row") ||
    e.append('<div class="gallery-items-row row"></div>');
}
function wrapItemInColumn(e, t) {
  if (t.constructor === Number)
    e.wrap(`<div class='item-column mb-4 col-${Math.ceil(12 / t)}'></div>`);
  else if (t.constructor === Object) {
    var a = "";
    t.xs && (a += ` col-${Math.ceil(12 / t.xs)}`),
      t.sm && (a += ` col-sm-${Math.ceil(12 / t.sm)}`),
      t.md && (a += ` col-md-${Math.ceil(12 / t.md)}`),
      t.lg && (a += ` col-lg-${Math.ceil(12 / t.lg)}`),
      t.xl && (a += ` col-xl-${Math.ceil(12 / t.xl)}`),
      e.wrap(`<div class='item-column mb-4${a}'></div>`);
  } else
    console.error(
      `Columns should be defined as numbers or objects. ${typeof t} is not supported.`
    );
}
function moveItemInRowWrapper(e) {
  e.appendTo(".gallery-items-row");
}
function responsiveImageItem(e) {
  "IMG" === e.prop("tagName") && e.addClass("img-fluid");
}
function openLightBox(e, t) {
  $(`#${t}`).find(".lightboxImage").attr("src", e.attr("src")),
    $(`#${t}`).modal("toggle");
}
function changeImage(e) {
  let t = null;
  $("img.gallery-item").each(function () {
    $(this).attr("src") === $(".lightboxImage").attr("src") && (t = $(this));
  });
  let a = $(".tags-bar span.active-tag").data("images-toggle"),
    i = [];
  "all" === a
    ? $(".item-column").each(function () {
        $(this).children("img").length && i.push($(this).children("img"));
      })
    : $(".item-column").each(function () {
        $(this).children("img").data("gallery-tag") === a &&
          i.push($(this).children("img"));
      });
  let n = 0;
  $(i).each(function (e) {
    $(t).attr("src") === $(this).attr("src") && (n = e);
  });
  let l;
  "prev" === e
    ? (l = (n - 1 + i.length) % i.length)
    : "next" === e && (l = (n + 1) % i.length);
  let o = i[l];
  $(".lightboxImage").attr("src", $(o).attr("src"));
}
function prevImage(e) {
  changeImage("prev");
}
function nextImage(e) {
  changeImage("next");
}
function createLightBox(e, t, a) {
  e.append(`<div class="modal fade" id="${
    t || "galleryLightbox"
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
function showItemTags(e, t, a) {
  var i =
    '<li class="nav-item"><span class="nav-link active active-tag" data-images-toggle="all" role="button" aria-pressed="true" tabindex="0">Tous</span></li>';
  $.each(a, function (e, t) {
    i += `<li class="nav-item">
  <span class="nav-link" data-images-toggle="${t}" role="button" aria-pressed="false" tabindex="0">${t}</span></li>`;
  });
  var n = `<ul class="my-4 tags-bar nav nav-pills">${i}</ul>`;
  "bottom" === t
    ? e.append(n)
    : "top" === t
    ? e.prepend(n)
    : console.error(`Unknown tags position: ${t}`);
}
function filterByTag() {
  if (!$(this).hasClass("active-tag")) {
    $(".active-tag")
      .removeClass("active active-tag")
      .attr("aria-pressed", "false"),
      $(this).addClass("active active-tag").attr("aria-pressed", "true");
    var e = $(this).data("images-toggle");
    $(".gallery-item").each(function () {
      $(this).parents(".item-column").hide(),
        "all" === e
          ? $(this).parents(".item-column").show(300)
          : $(this).data("gallery-tag") === e &&
            $(this).parents(".item-column").show(300);
    });
  }
}
!(function (e) {
  (e.fn.mauGallery = function (t) {
    t = e.extend(e.fn.mauGallery.defaults, t);
    var a = [];
    return this.each(function () {
      e.fn.mauGallery.methods.createRowWrapper(e(this)),
        t.lightBox &&
          e.fn.mauGallery.methods.createLightBox(
            e(this),
            t.lightboxId,
            t.navigation
          ),
        e.fn.mauGallery.listeners(t),
        e(this)
          .children(".gallery-item")
          .each(function (i) {
            e.fn.mauGallery.methods.responsiveImageItem(e(this)),
              e.fn.mauGallery.methods.moveItemInRowWrapper(e(this)),
              e.fn.mauGallery.methods.wrapItemInColumn(e(this), t.columns);
            var n = e(this).data("gallery-tag");
            t.showTags && void 0 !== n && -1 === a.indexOf(n) && a.push(n);
          }),
        t.showTags &&
          e.fn.mauGallery.methods.showItemTags(e(this), t.tagsPosition, a),
        e(this).fadeIn(500);
    });
  }),
    (e.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    // (e.fn.mauGallery.listeners = function (t) {
    //   e(".gallery-item").on("click", function () {
    //     t.lightBox &&
    //       "IMG" === e(this).prop("tagName") &&
    //       e.fn.mauGallery.methods.openLightBox(e(this), t.lightboxId);
    //   }),
    //     e(".gallery").on("click", ".nav-link", function () {
    //       e.fn.mauGallery.methods.filterByTag.call(this);
    //     }),
    //     e(".gallery").on("keydown", ".nav-link", function (e) {
    //       if (e.key === "Enter" || e.key === " ") {
    //         e.preventDefault();
    //         e.fn.mauGallery.methods.filterByTag.call(this);
    //       }
    //     }),
    //     e(".gallery").on("click", ".mg-prev", function () {
    //       e.fn.mauGallery.methods.prevImage(t.lightboxId);
    //     }),
    //     e(".gallery").on("click", ".mg-next", function () {
    //       e.fn.mauGallery.methods.nextImage(t.lightboxId);
    //     });
    // }),
    (e.fn.mauGallery.listeners = function (t) {
      e(".gallery-item").on("click", function () {
        t.lightBox &&
          "IMG" === e(this).prop("tagName") &&
          e.fn.mauGallery.methods.openLightBox(e(this), t.lightboxId);
      }),
        e(".gallery").on("click", ".nav-link", function () {
          e.fn.mauGallery.methods.filterByTag.call(this);
        }),
        e(".gallery").on("click", ".mg-prev", function () {
          e.fn.mauGallery.methods.prevImage(t.lightboxId);
        }),
        e(".gallery").on("click", ".mg-next", function () {
          e.fn.mauGallery.methods.nextImage(t.lightboxId);
        });
    }),
    (e.fn.mauGallery.methods = {
      createRowWrapper: function (e) {
        createRowWrapper(e);
      },
      wrapItemInColumn: function (e, t) {
        wrapItemInColumn(e, t);
      },
      moveItemInRowWrapper: function (e) {
        moveItemInRowWrapper(e);
      },
      responsiveImageItem: function (e) {
        responsiveImageItem(e);
      },
      openLightBox: function (e, t) {
        openLightBox(e, t);
      },
      prevImage: function (e) {
        prevImage(e);
      },
      nextImage: function (e) {
        nextImage(e);
      },
      createLightBox: function (e, t, a) {
        createLightBox(e, t, a);
      },
      showItemTags: function (e, t, a) {
        showItemTags(e, t, a);
      },
      filterByTag: function () {
        filterByTag.call(this);
      },
    });
})(jQuery);
