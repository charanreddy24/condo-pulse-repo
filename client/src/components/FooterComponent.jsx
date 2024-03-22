import {Footer} from 'flowbite-react';
import { Link, useLocation } from "react-router-dom";
import {BsFacebook, BsInstagram, BsTwitter} from 'react-icons/bs';

export default function FooterComponent(){
   return(
      <Footer container className='border border-t-8  rounded-lg border-violet-300'>
         <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
               <div className='mt-5'>
                  <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
                     <span className="px-2 py-1 bg-gradient-to-r from-red-300 via-mint-500 to-purple-300 rounded-lg">
                        HD Protective Services
                     </span>
                  </Link>
               </div>
            </div>
            <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
               <div>
                  <Footer.Title title='About'/>
                  <Footer.LinkGroup col>
                     <Footer.Link href='/about' target='_blank' rel='noopener noreferrer'>
                     HD Protective Services
                     </Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div>
                  <Footer.Title title='Follow us'/>
                  <Footer.LinkGroup col>
                     <Footer.Link href='#'>
                     Github
                     </Footer.Link>
                  </Footer.LinkGroup>
               </div>
               <div>
                  <Footer.Title title='Legal'/>
                  <Footer.LinkGroup col>
                     <Footer.Link href='#'>
                        Privacy Policy
                     </Footer.Link> 
                     <Footer.Link href='#'>
                        Terms &amp; Conditions
                     </Footer.Link> 

                  </Footer.LinkGroup>
               </div>
            </div>
            <div>
               <Footer.Divider />
               <div className='w-full sm:flex sm:items-center sm:justify-between'>
                  <Footer.Copyright href='#' by='Condo Pulse' year={new Date().getFullYear()} />
               
               <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
                  <Footer.Icon href='#' icon={BsFacebook}/>
                  <Footer.Icon href='#' icon={BsInstagram}/>
                  <Footer.Icon href='#' icon={BsTwitter}/>
               </div>
               </div>
            </div>
         </div>

      </Footer>
   )
}