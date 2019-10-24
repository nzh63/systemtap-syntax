export default [
    'probe::vm.brk — Fires when a brk is requested (i.e. the heap will be resized)',
    'probe::vm.kfree — Fires when kfree is requested',
    'probe::vm.kmalloc — Fires when kmalloc is requested',
    'probe::vm.kmalloc_node — Fires when kmalloc_node is requested',
    'probe::vm.kmem_cache_alloc — Fires when kmem_cache_alloc is requested',
    'probe::vm.kmem_cache_alloc_node — Fires when kmem_cache_alloc_node is requested',
    'probe::vm.kmem_cache_free — Fires when kmem_cache_free is requested',
    'probe::vm.mmap — Fires when an mmap is requested',
    'probe::vm.munmap — Fires when an munmap is requested',
    'probe::vm.oom_kill — Fires when a thread is selected for termination by the OOM killer',
    'probe::vm.pagefault — Records that a page fault occurred',
    'probe::vm.pagefault.return — Indicates what type of fault occurred',
    'probe::vm.write_shared — Attempts at writing to a shared page',
    'probe::vm.write_shared_copy — Page copy for shared page write',
    'probe::scheduler.balance — A cpu attempting to find more work.',
    'probe::scheduler.cpu_off — Process is about to stop running on a cpu',
    'probe::scheduler.cpu_on — Process is beginning execution on a cpu',
    'probe::scheduler.ctxswitch — A context switch is occuring.',
    'probe::scheduler.kthread_stop — A thread created by kthread_create is being stopped',
    'probe::scheduler.kthread_stop.return — A kthread is stopped and gets the return value',
    'probe::scheduler.migrate — Task migrating across cpus',
    'probe::scheduler.process_exit — Process exiting',
    'probe::scheduler.process_fork — Process forked',
    'probe::scheduler.process_free — Scheduler freeing a data structure for a process',
    'probe::scheduler.process_wait — Scheduler starting to wait on a process',
    'probe::scheduler.signal_send — Sending a signal',
    'probe::scheduler.tick — Schedulers internal tick, a processes timeslice accounting is updated',
    'probe::scheduler.wait_task — Waiting on a task to unschedule (become inactive)',
    'probe::scheduler.wakeup — Task is woken up',
    'probe::scheduler.wakeup_new — Newly created task is woken up for the first time',
    'probe::ioblock.end — Fires whenever a block I/O transfer is complete.',
    'probe::ioblock.request — Fires whenever making a generic block I/O request.',
    'probe::ioblock_trace.bounce — Fires whenever a buffer bounce is needed for at least one page of a block IO request.',
    'probe::ioblock_trace.end — Fires whenever a block I/O transfer is complete.',
    'probe::ioblock_trace.request — Fires just as a generic block I/O request is created for a bio.',
    'probe::ioscheduler.elv_add_request — probe to indicate request is added to the request queue.',
    'probe::ioscheduler.elv_add_request.kp — kprobe based probe to indicate that a request was added to the request queue',
    'probe::ioscheduler.elv_add_request.tp — tracepoint based probe to indicate a request is added to the request queue.',
    'probe::ioscheduler.elv_completed_request — Fires when a request is completed',
    'probe::ioscheduler.elv_next_request — Fires when a request is retrieved from the request queue',
    'probe::ioscheduler.elv_next_request.return — Fires when a request retrieval issues a return signal',
    'probe::ioscheduler_trace.elv_abort_request — Fires when a request is aborted.',
    'probe::ioscheduler_trace.elv_completed_request — Fires when a request is',
    'probe::ioscheduler_trace.elv_issue_request — Fires when a request is',
    'probe::ioscheduler_trace.elv_requeue_request — Fires when a request is',
    'probe::ioscheduler_trace.plug — Fires when a request queue is plugged;',
    'probe::ioscheduler_trace.unplug_io — Fires when a request queue is unplugged;',
    'probe::ioscheduler_trace.unplug_timer — Fires when unplug timer associated',
    'probe::scsi.iocompleted — SCSI mid-layer running the completion processing for block device I/O requests',
    'probe::scsi.iodispatching — SCSI mid-layer dispatched low-level SCSI command',
    'probe::scsi.iodone — SCSI command completed by low level driver and enqueued into the done queue.',
    'probe::scsi.ioentry — Prepares a SCSI mid-layer request',
    'probe::scsi.ioexecute — Create mid-layer SCSI request and wait for the result',
    'probe::scsi.set_state — Order SCSI device state change',
    'probe::tty.init — Called when a tty is being initalized',
    'probe::tty.ioctl — called when a ioctl is request to the tty',
    'probe::tty.open — Called when a tty is opened',
    'probe::tty.poll — Called when a tty device is being polled',
    'probe::tty.read — called when a tty line will be read',
    'probe::tty.receive — called when a tty receives a message',
    'probe::tty.register — Called when a tty device is registred',
    'probe::tty.release — Called when the tty is closed',
    'probe::tty.resize — Called when a terminal resize happens',
    'probe::tty.unregister — Called when a tty device is being unregistered',
    'probe::tty.write — write to the tty line',
    'probe::irq_handler.entry — Execution of interrupt handler starting',
    'probe::irq_handler.exit — Execution of interrupt handler completed',
    'probe::softirq.entry — Execution of handler for a pending softirq starting',
    'probe::softirq.exit — Execution of handler for a pending softirq completed',
    'probe::workqueue.create — Creating a new workqueue',
    'probe::workqueue.destroy — Destroying workqueue',
    'probe::workqueue.execute — Executing deferred work',
    'probe::workqueue.insert — Queuing work on a workqueue',
    'probe::netdev.change_mac — Called when the netdev_name has the MAC changed',
    'probe::netdev.change_mtu — Called when the netdev MTU is changed',
    'probe::netdev.change_rx_flag — Called when the device RX flag will be changed',
    'probe::netdev.close — Called when the device is closed',
    'probe::netdev.get_stats — Called when someone asks the device statistics',
    'probe::netdev.hard_transmit — Called when the devices is going to TX (hard)',
    'probe::netdev.ioctl — Called when the device suffers an IOCTL',
    'probe::netdev.open — Called when the device is opened',
    'probe::netdev.receive — Data received from network device.',
    'probe::netdev.register — Called when the device is registered',
    'probe::netdev.rx — Called when the device is going to receive a packet',
    'probe::netdev.set_promiscuity — Called when the device enters/leaves promiscuity',
    'probe::netdev.transmit — Network device transmitting buffer',
    'probe::netdev.unregister — Called when the device is being unregistered',
    'probe::netfilter.arp.forward — - Called for each ARP packet to be forwarded',
    'probe::netfilter.arp.in — - Called for each incoming ARP packet',
    'probe::netfilter.arp.out — - Called for each outgoing ARP packet',
    'probe::netfilter.bridge.forward — Called on an incoming bridging packet destined for some other computer',
    'probe::netfilter.bridge.local_in — Called on a bridging packet destined for the local computer',
    'probe::netfilter.bridge.local_out — Called on a bridging packet coming from a local process',
    'probe::netfilter.bridge.post_routing — - Called before a bridging packet hits the wire',
    'probe::netfilter.bridge.pre_routing — - Called before a bridging packet is routed',
    'probe::netfilter.ip.forward — Called on an incoming IP packet addressed to some other computer',
    'probe::netfilter.ip.local_in — Called on an incoming IP packet addressed to the local computer',
    'probe::netfilter.ip.local_out — Called on an outgoing IP packet',
    'probe::netfilter.ip.post_routing — Called immediately before an outgoing IP packet leaves the computer',
    'probe::netfilter.ip.pre_routing — Called before an IP packet is routed',
    'probe::sunrpc.clnt.bind_new_program — Bind a new RPC program to an existing client',
    'probe::sunrpc.clnt.call_async — Make an asynchronous RPC call',
    'probe::sunrpc.clnt.call_sync — Make a synchronous RPC call',
    'probe::sunrpc.clnt.clone_client — Clone an RPC client structure',
    'probe::sunrpc.clnt.create_client — Create an RPC client',
    'probe::sunrpc.clnt.restart_call — Restart an asynchronous RPC call',
    'probe::sunrpc.clnt.shutdown_client — Shutdown an RPC client',
    'probe::sunrpc.sched.delay — Delay an RPC task',
    'probe::sunrpc.sched.execute — Execute the RPC `scheduler\'',
    'probe::sunrpc.sched.new_task — Create new task for the specified client',
    'probe::sunrpc.sched.release_task — Release all resources associated with a task',
    'probe::sunrpc.svc.create — Create an RPC service',
    'probe::sunrpc.svc.destroy — Destroy an RPC service',
    'probe::sunrpc.svc.drop — Drop RPC request',
    'probe::sunrpc.svc.process — Process an RPC request',
    'probe::sunrpc.svc.recv — Listen for the next RPC request on any socket',
    'probe::sunrpc.svc.register — Register an RPC service with the local portmapper',
    'probe::sunrpc.svc.send — Return reply to RPC client',
    'probe::tcp.disconnect — TCP socket disconnection',
    'probe::tcp.disconnect.return — TCP socket disconnection complete',
    'probe::tcp.receive — Called when a TCP packet is received',
    'probe::tcp.recvmsg — Receiving TCP message',
    'probe::tcp.recvmsg.return — Receiving TCP message complete',
    'probe::tcp.sendmsg — Sending a tcp message',
    'probe::tcp.sendmsg.return — Sending TCP message is done',
    'probe::tcp.setsockopt — Call to setsockopt',
    'probe::tcp.setsockopt.return — Return from setsockopt',
    'probe::udp.disconnect — Fires when a process requests for a UDP disconnection',
    'probe::udp.disconnect.return — UDP has been disconnected successfully',
    'probe::udp.recvmsg — Fires whenever a UDP message is received',
    'probe::udp.recvmsg.return — Fires whenever an attempt to receive a UDP message received is completed',
    'probe::udp.sendmsg — Fires whenever a process sends a UDP message',
    'probe::udp.sendmsg.return — Fires whenever an attempt to send a UDP message is completed',
    'probe::socket.aio_read — Receiving message via sock_aio_read',
    'probe::socket.aio_read.return — Conclusion of message received via sock_aio_read',
    'probe::socket.aio_write — Message send via sock_aio_write',
    'probe::socket.aio_write.return — Conclusion of message send via sock_aio_write',
    'probe::socket.close — Close a socket',
    'probe::socket.close.return — Return from closing a socket',
    'probe::socket.create — Creation of a socket',
    'probe::socket.create.return — Return from Creation of a socket',
    'probe::socket.read_iter — Receiving message via sock_read_iter',
    'probe::socket.read_iter.return — Conclusion of message received via sock_read_iter',
    'probe::socket.readv — Receiving a message via sock_readv',
    'probe::socket.readv.return — Conclusion of receiving a message via sock_readv',
    'probe::socket.receive — Message received on a socket.',
    'probe::socket.recvmsg — Message being received on socket',
    'probe::socket.recvmsg.return — Return from Message being received on socket',
    'probe::socket.send — Message sent on a socket.',
    'probe::socket.sendmsg — Message is currently being sent on a socket.',
    'probe::socket.sendmsg.return — Return from socket.sendmsg.',
    'probe::socket.write_iter — Message send via sock_write_iter',
    'probe::socket.write_iter.return — Conclusion of message send via sock_write_iter',
    'probe::socket.writev — Message sent via socket_writev',
    'probe::socket.writev.return — Conclusion of message sent via socket_writev',
    'probe::ipmib.ForwDatagrams — Count forwarded packet',
    'probe::ipmib.FragFails — Count datagram fragmented unsuccessfully',
    'probe::ipmib.FragOKs — Count datagram fragmented successfully',
    'probe::ipmib.InAddrErrors — Count arriving packets with an incorrect address',
    'probe::ipmib.InDiscards — Count discarded inbound packets',
    'probe::ipmib.InNoRoutes — Count an arriving packet with no matching socket',
    'probe::ipmib.InReceives — Count an arriving packet',
    'probe::ipmib.InUnknownProtos — Count arriving packets with an unbound proto',
    'probe::ipmib.OutRequests — Count a request to send a packet',
    'probe::ipmib.ReasmReqds — Count number of packet fragments reassembly requests',
    'probe::ipmib.ReasmTimeout — Count Reassembly Timeouts',
    'probe::linuxmib.DelayedACKs — Count of delayed acks',
    'probe::linuxmib.ListenDrops — Count of times conn request that were dropped',
    'probe::linuxmib.ListenOverflows — Count of times a listen queue overflowed',
    'probe::linuxmib.TCPMemoryPressures — Count of times memory pressure was used',
    'probe::tcpmib.ActiveOpens — Count an active opening of a socket',
    'probe::tcpmib.AttemptFails — Count a failed attempt to open a socket',
    'probe::tcpmib.CurrEstab — Update the count of open sockets',
    'probe::tcpmib.EstabResets — Count the reset of a socket',
    'probe::tcpmib.InSegs — Count an incoming tcp segment',
    'probe::tcpmib.OutRsts — Count the sending of a reset packet',
    'probe::tcpmib.OutSegs — Count the sending of a TCP segment',
    'probe::tcpmib.PassiveOpens — Count the passive creation of a socket',
    'probe::tcpmib.RetransSegs — Count the retransmission of a TCP segment',
    'probe::kprocess.create — Fires whenever a new process or thread is successfully created',
    'probe::kprocess.exec — Attempt to exec to a new program',
    'probe::kprocess.exec_complete — Return from exec to a new program',
    'probe::kprocess.exit — Exit from process',
    'probe::kprocess.release — Process released',
    'probe::kprocess.start — Starting new process',
    'probe::signal.check_ignored — Checking to see signal is ignored',
    'probe::signal.check_ignored.return — Check to see signal is ignored completed',
    'probe::signal.checkperm — Check being performed on a sent signal',
    'probe::signal.checkperm.return — Check performed on a sent signal completed',
    'probe::signal.do_action — Examining or changing a signal action',
    'probe::signal.do_action.return — Examining or changing a signal action completed',
    'probe::signal.flush — Flushing all pending signals for a task',
    'probe::signal.force_segv — Forcing send of SIGSEGV',
    'probe::signal.force_segv.return — Forcing send of SIGSEGV complete',
    'probe::signal.handle — Signal handler being invoked',
    'probe::signal.handle.return — Signal handler invocation completed',
    'probe::signal.pending — Examining pending signal',
    'probe::signal.pending.return — Examination of pending signal completed',
    'probe::signal.procmask — Examining or changing blocked signals',
    'probe::signal.procmask.return — Examining or changing blocked signals completed',
    'probe::signal.send — Signal being sent to a process',
    'probe::signal.send.return — Signal being sent to a process completed (deprecated in SystemTap 2.1)',
    'probe::signal.send_sig_queue — Queuing a signal to a process',
    'probe::signal.send_sig_queue.return — Queuing a signal to a process completed',
    'probe::signal.sys_tgkill — Sending kill signal to a thread group',
    'probe::signal.sys_tgkill.return — Sending kill signal to a thread group completed',
    'probe::signal.sys_tkill — Sending a kill signal to a thread',
    'probe::signal.syskill — Sending kill signal to a process',
    'probe::signal.syskill.return — Sending kill signal completed',
    'probe::signal.systkill.return — Sending kill signal to a thread completed',
    'probe::signal.wakeup — Sleeping process being wakened for signal',
    'probe::stap.cache_add_mod — Adding kernel instrumentation module to cache',
    'probe::stap.cache_add_nss — Add NSS (Network Security Services) information to cache',
    'probe::stap.cache_add_src — Adding C code translation to cache',
    'probe::stap.cache_clean — Removing file from stap cache',
    'probe::stap.cache_get — Found item in stap cache',
    'probe::stap.pass0 — Starting stap pass0 (parsing command line arguments)',
    'probe::stap.pass0.end — Finished stap pass0 (parsing command line arguments)',
    'probe::stap.pass1.end — Finished stap pass1 (parsing scripts)',
    'probe::stap.pass1a — Starting stap pass1 (parsing user script)',
    'probe::stap.pass1b — Starting stap pass1 (parsing library scripts)',
    'probe::stap.pass2 — Starting stap pass2 (elaboration)',
    'probe::stap.pass2.end — Finished stap pass2 (elaboration)',
    'probe::stap.pass3 — Starting stap pass3 (translation to C)',
    'probe::stap.pass3.end — Finished stap pass3 (translation to C)',
    'probe::stap.pass4 — Starting stap pass4 (compile C code into kernel module)',
    'probe::stap.pass4.end — Finished stap pass4 (compile C code into kernel module)',
    'probe::stap.pass5 — Starting stap pass5 (running the instrumentation)',
    'probe::stap.pass5.end — Finished stap pass5 (running the instrumentation)',
    'probe::stap.pass6 — Starting stap pass6 (cleanup)',
    'probe::stap.pass6.end — Finished stap pass6 (cleanup)',
    'probe::stap.system — Starting a command from stap',
    'probe::stap.system.return — Finished a command from stap',
    'probe::stap.system.spawn — stap spawned new process',
    'probe::stapio.receive_control_message — Received a control message',
    'probe::staprun.insert_module — Inserting SystemTap instrumentation module',
    'probe::staprun.remove_module — Removing SystemTap instrumentation module',
    'probe::staprun.send_control_message — Sending a control message',
    'probe::nfs.aop.readpage — NFS client synchronously reading a page',
    'probe::nfs.aop.readpages — NFS client reading multiple pages',
    'probe::nfs.aop.release_page — NFS client releasing page',
    'probe::nfs.aop.set_page_dirty — NFS client marking page as dirty',
    'probe::nfs.aop.write_begin — NFS client begin to write data',
    'probe::nfs.aop.write_end — NFS client complete writing data',
    'probe::nfs.aop.writepage — NFS client writing a mapped page to the NFS server',
    'probe::nfs.aop.writepages — NFS client writing several dirty pages to the NFS server',
    'probe::nfs.fop.aio_read — NFS client aio_read file operation',
    'probe::nfs.fop.aio_write — NFS client aio_write file operation',
    'probe::nfs.fop.check_flags — NFS client checking flag operation',
    'probe::nfs.fop.flush — NFS client flush file operation',
    'probe::nfs.fop.fsync — NFS client fsync operation',
    'probe::nfs.fop.llseek — NFS client llseek operation',
    'probe::nfs.fop.lock — NFS client file lock operation',
    'probe::nfs.fop.mmap — NFS client mmap operation',
    'probe::nfs.fop.open — NFS client file open operation',
    'probe::nfs.fop.read — NFS client read operation',
    'probe::nfs.fop.read_iter — NFS client read_iter file operation',
    'probe::nfs.fop.release — NFS client release page operation',
    'probe::nfs.fop.sendfile — NFS client send file operation',
    'probe::nfs.fop.write — NFS client write operation',
    'probe::nfs.fop.write_iter — NFS client write_iter file operation',
    'probe::nfs.proc.commit — NFS client committing data on server',
    'probe::nfs.proc.commit_done — NFS client response to a commit RPC task',
    'probe::nfs.proc.commit_setup — NFS client setting up a commit RPC task',
    'probe::nfs.proc.create — NFS client creating file on server',
    'probe::nfs.proc.handle_exception — NFS client handling an NFSv4 exception',
    'probe::nfs.proc.lookup — NFS client opens/searches a file on server',
    'probe::nfs.proc.open — NFS client allocates file read/write context information',
    'probe::nfs.proc.read — NFS client synchronously reads file from server',
    'probe::nfs.proc.read_done — NFS client response to a read RPC task',
    'probe::nfs.proc.read_setup — NFS client setting up a read RPC task',
    'probe::nfs.proc.release — NFS client releases file read/write context information',
    'probe::nfs.proc.remove — NFS client removes a file on server',
    'probe::nfs.proc.rename — NFS client renames a file on server',
    'probe::nfs.proc.rename_done — NFS client response to a rename RPC task',
    'probe::nfs.proc.rename_setup — NFS client setting up a rename RPC task',
    'probe::nfs.proc.write — NFS client synchronously writes file to server',
    'probe::nfs.proc.write_done — NFS client response to a write RPC task',
    'probe::nfs.proc.write_setup — NFS client setting up a write RPC task',
    'probe::nfsd.close — NFS server closing a file for client',
    'probe::nfsd.commit — NFS server committing all pending writes to stable storage',
    'probe::nfsd.create — NFS server creating a file(regular,dir,device,fifo) for client',
    'probe::nfsd.createv3 — NFS server creating a regular file or set file attributes for client',
    'probe::nfsd.dispatch — NFS server receives an operation from client',
    'probe::nfsd.lookup — NFS server opening or searching file for a file for client',
    'probe::nfsd.open — NFS server opening a file for client',
    'probe::nfsd.proc.commit — NFS server performing a commit operation for client',
    'probe::nfsd.proc.create — NFS server creating a file for client',
    'probe::nfsd.proc.lookup — NFS server opening or searching for a file for client',
    'probe::nfsd.proc.read — NFS server reading file for client',
    'probe::nfsd.proc.remove — NFS server removing a file for client',
    'probe::nfsd.proc.rename — NFS Server renaming a file for client',
    'probe::nfsd.proc.write — NFS server writing data to file for client',
    'probe::nfsd.read — NFS server reading data from a file for client',
    'probe::nfsd.rename — NFS server renaming a file for client',
    'probe::nfsd.unlink — NFS server removing a file or a directory for client',
    'probe::nfsd.write — NFS server writing data to a file for client',
    'probe::json_data — Fires whenever JSON data is wanted by a reader.',
    'probe::syscall_any — Record entry into a syscall',
    'probe::syscall_any.return — Record exit from a syscall',
    ' Chapter 1. Introduction',];