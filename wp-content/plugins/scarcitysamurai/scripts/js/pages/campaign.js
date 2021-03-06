// Generated by CoffeeScript 1.6.3
/*

LEGAL COPYRIGHT NOTICE

Copyright (c) Noble Samurai Pty Ltd, 2008-2013. All Rights Reserved.

This software is proprietary to and embodies the confidential technology of Noble Samurai Pty Ltd.
Possession, use, dissemination or copying of this software and media is authorised only pursuant
to a valid written license from Noble Samurai Pty Ltd. Questions or requests regarding permission may
be sent by email to legal@noblesamurai.com or by post to PO Box 477, Blackburn Victoria 3130, Australia.
*/


(function() {
  jQuery(function($) {
    var ScarcitySamuraiCampaign;
    ScarcitySamuraiCampaign = (function() {
      function ScarcitySamuraiCampaign() {
        this.securityParams = {
          security_token: $('[name="security_token"]').val(),
          _wp_http_referer: $('[name="_wp_http_referer"]').val()
        };
        this.campaignId = +scarcitySamuraiData.campaign_id;
        this.$campaignName = $('#title');
        this.$campaignNamePrompt = $('#title-prompt-text');
        if (this.$campaignName.val() === '') {
          this.$campaignNamePrompt.removeClass('screen-reader-text');
        }
        this.$unpublishedPagesWarning = $('#ss-edit-campaign-unpublished-pages-warning');
        this.$publishNowButton = $('#ss-edit-campaign-publish-these-pages-now-button');
        this.createBindings();
      }

      ScarcitySamuraiCampaign.prototype.createBindings = function() {
        var _this = this;
        this.$campaignNamePrompt.click(function() {
          _this.$campaignNamePrompt.addClass('screen-reader-text');
          return _this.$campaignName.focus();
        });
        this.$campaignName.blur(function() {
          if (_this.$campaignName.val() === '') {
            return _this.$campaignNamePrompt.removeClass('screen-reader-text');
          }
        }).focus(function() {
          return _this.$campaignNamePrompt.addClass('screen-reader-text');
        }).keydown(function(event) {
          _this.$campaignNamePrompt.addClass('screen-reader-text');
          return _this.$campaignName.unbind(event);
        });
        this.$publishNowButton.click(function() {
          return _this.publishAll();
        });
        return this.bindCopyToClipboardButtons();
      };

      ScarcitySamuraiCampaign.prototype.publishAll = function() {
        var data, publishAllRequest,
          _this = this;
        data = {
          action: 'ss_publish_pages',
          data: JSON.stringify({
            campaign_id: this.campaignId
          })
        };
        data = _.extend(data, this.securityParams);
        publishAllRequest = $.ajax({
          type: "POST",
          url: ajaxurl,
          data: data,
          dataType: 'json'
        });
        return publishAllRequest.done(function(result) {
          var emailUrl, pageId, _ref;
          if (result.success) {
            _this.$unpublishedPagesWarning.hide();
            $('.ss-draft').hide();
            _ref = result.data.email_urls;
            for (pageId in _ref) {
              emailUrl = _ref[pageId];
              $(".ss-page-" + pageId).addClass('ss-page-status-publish').find('.ss-page-url').val(emailUrl);
            }
            return _this.bindCopyToClipboardButtons();
          } else {
            return ScarcitySamuraiHelper.error(result.data);
          }
        });
      };

      ScarcitySamuraiCampaign.prototype.bindCopyToClipboardButtons = function() {
        var _this = this;
        return $('.ss-edit-campaign-copy-to-clipboard-button').each(function(index, copyToClipboardButton) {
          var $copyToClipboardButton, $copyToClipboardConfirmation;
          $copyToClipboardButton = $(copyToClipboardButton);
          $copyToClipboardConfirmation = $copyToClipboardButton.siblings('.ss-copy-to-clipboard-confirmation-message');
          $copyToClipboardButton.zclip('remove');
          if ($copyToClipboardButton.closest('.ss-page-status-publish').length === 0) {
            return;
          }
          return $copyToClipboardButton.zclip({
            path: '../wp-content/plugins/scarcitysamurai/vendor/zclip/ZeroClipboard.swf',
            zIndex: 1100,
            copy: function() {
              return $copyToClipboardButton.siblings('input').val();
            },
            afterCopy: function() {
              $copyToClipboardConfirmation.show();
              setTimeout(function() {
                return $copyToClipboardConfirmation.fadeOut(1000);
              }, 5000);
            }
          });
        });
      };

      return ScarcitySamuraiCampaign;

    })();
    return new ScarcitySamuraiCampaign();
  });

}).call(this);
