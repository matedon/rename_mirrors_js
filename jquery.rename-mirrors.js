(function($) {

$(window).on('load', function() {
    const $flc = $('[data-files-container]')
    const $fls = $('[data-files]').hide()
    $.ajax({
        'url': 'config/config.json',
        'dataType': 'json',
        'success': function (res) {
            console.log(res)
            $.each(res.paths, function (i, path) {
                console.log(path)
                $fls.clone(true, true).show().appendTo($flc)
                .find('[data-files-path]').val(path).trigger('input')
            })
        }
    })
    $('body').on('dblclick', '[data-files-row]', function () {
        const $th = $(this)
        const td = $th.data()
        $th.closest('[data-files]').find('[data-files-path]').val(td.path).trigger('input')
    })
    $('body').on('input', '[data-files-path]', function () {
        const $th = $(this)
        const td = $th.data()
        if (td.filesPathTime) {
            clearTimeout(td.filesPathTime)
        }
        td.filesPathTime = setTimeout(function() {
            if (td.$filesPathReq != null) { 
                td.$filesPathReq.abort()
                td.$filesPathReq = null
            }
            td.$filesPathReq = $.ajax({
                'url': 'folderList.php',
                'dataType': 'json',
                'data': {
                    'path': $th.val()
                },
                'success': function (res) {
                    console.log(res)
                    const $fls = $th.closest('[data-files]')
                    const $frc = $fls.find('[data-files-row-clone]')
                    const $frs = $fls.find('[data-files-rows]')
                    $fls.find('[data-files-row]').filter(function () {
                        return $(this).is('[data-files-row-clone]') ? false : true
                    }).remove()
                    $.each(res.files, function (i, row) {
                        console.log(row.name)
                        let name = row.isDir ? '[' + row.name + ']' : row.name
                        $frc.clone(true, true).removeAttr('data-files-row-clone')
                        .data(row).appendTo($frs)
                        .find('[data-files-row-name]').html(name)
                    })
                }
            })
        }, 300)
    })
    // $('[data-files-path]').trigger('input')

})

})(jQuery);