/* eslint no-underscore-dangle: 0 */
function appendComment(comment) {
  const article = $('<article>');
  article.addClass('my-2');

  let { body } = comment;
  body = body.replace(/</g, '&lt;');
  body = body.replace(/>/g, '&gt;');

  article.append(body);
  article.append(`<i class="fas fa-comment-slash fa-lg delete-comment float-right text-danger" data-id=${comment._id}></i>`);
  article.attr('data-id', comment._id);
  article.addClass('comment');
  $('#article-comments').append(article);
}

$(document).on('click', '.delete-comment', (event) => {
  const commentID = $(event.currentTarget).attr('data-id');
  console.log(commentID);

  const commentArticle = $(`.comment[data-id=${commentID}]`);
  console.log(commentArticle);
  $.ajax({
    type: 'DELETE',
    url: `/api/comments/${commentID}`,
  }).then(() => {
    commentArticle.remove();
  });
});

$(document).ready(() => {
  $('.view-comments').on('click', (event) => {
    const articleID = $(event.currentTarget).attr('data-id');
    $('#article-ID').text(articleID);
    $('#add-comment').attr('data-id', articleID);
    $('#article-comments').empty();
    $.getJSON(`/api/articles/${articleID}/comments`, (data) => {
      const { comments } = data[0];
      if (comments.length < 1) {
        $('#article-comments').append('<h3>No comments yet for this article</h3>');
      } else {
        comments.forEach((comment) => {
          appendComment(comment);
        });
      }
      $('#comment-modal').modal().show();
    });
  });

  $('#add-comment').on('click', (event) => {
    event.preventDefault();
    const articleID = $(event.currentTarget).attr('data-id');
    const comment = { body: $('#comment-textarea').val() };
    $.post(`/api/articles/${articleID}/comments`, comment, (data) => {
      // Append new comment, clear textarea
      appendComment(data);
      $('#comment-textarea').val('');
    });
  });

  // $('.delete-comment').on('click', (event) => {
  //   const commentID = $(event.currentTarget).attr('data-id');
  //   console.log(commentID);
  //   console.log('hi?');
  // });
});