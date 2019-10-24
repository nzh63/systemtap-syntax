export default [
    'vfs.__add_to_page_cache $page:struct page* $mapping:struct address_space* $offset:long unsigned int $gfp_mask:gfp_t',
    'vfs.__set_page_dirty_buffers dev:long devname:string ino:long index:long name:string argstr:string size:long units:string $page:struct page*',
    'vfs.add_to_page_cache dev:long devname:string ino:long index:long nrpages:long size:long units:string name:string argstr:string $page:struct page* $mapping:struct address_space* $offset:long unsigned int $gfp_mask:gfp_t',
    'vfs.buffer_migrate_page dev:long ino:long devname:string index:long name:string argstr:string size:long units:string $mapping:struct address_space* $newpage:struct page* $page:struct page* $mode:enum migrate_mode',
    'vfs.do_mpage_readpage dev:long devname:string ino:long index:long size:long name:string argstr:string units:string $bio:struct bio* $page:struct page* $nr_pages:unsigned int $last_block_in_bio:sector_t* $map_bh:struct buffer_head* $first_logical_block:long unsigned int* $get_block:get_block_t* $gfp:gfp_t $blocks:sector_t[]',
    'vfs.do_sync_read dev:long devname:string ino:long file:long pathname:string len:long pos:long buf:long name:string argstr:string size:long units:string bytes_to_read:long $filp:struct file* $buf:char* $len:size_t $ppos:loff_t* $iov:struct iovec $kiocb:struct kiocb',
    'vfs.do_sync_write dev:long devname:string ino:long file:long pathname:string len:long pos:long buf:long bytes_to_write:long name:string argstr:string size:long units:string $filp:struct file* $buf:char const* $len:size_t $ppos:loff_t* $iov:struct iovec $kiocb:struct kiocb',
    'vfs.open name:string path:long cred:long pathname:string argstr:string $path:struct path const* $filp:struct file* $cred:struct cred const*',
    'vfs.read file:long pathname:string pos:long buf:long bytes_to_read:long dev:long devname:string ino:long name:string argstr:string $file:struct file* $buf:char* $count:size_t $pos:loff_t*',
    'vfs.readv file:long pathname:string dev:long devname:string ino:long pos:long vec:long vlen:long bytes_to_read:long name:string argstr:string $file:struct file* $vec:struct iovec const* $vlen:long unsigned int $pos:loff_t*',
    'vfs.remove_from_page_cache dev:long devname:string ino:long index:long name:string argstr:string $page:struct page* $shadow:void*',
    'vfs.write file:long pathname:string pos:long buf:long bytes_to_write:long dev:long devname:string ino:long name:string argstr:string $file:struct file* $buf:char const* $count:size_t $pos:loff_t*',
    'vfs.writev file:long pathname:string dev:long devname:string ino:long pos:long vlen:long vec:long bytes_to_write:long name:string argstr:string $file:struct file* $vec:struct iovec const* $vlen:long unsigned int $pos:loff_t*'
];
