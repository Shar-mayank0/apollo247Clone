import React from 'react'
import TextContent from '@/components/textContent'
import FilterComponent from '@/components/filterComp'

function homepage() {
  return (
    <main className='main-container'>
      <div className='sidebarFilter'>
        <FilterComponent />
      </div>
      <div className='main-content'>
        <div className='lower-seo-content'>
          <TextContent />
        </div>
      </div>
    </main>
  )
}

export default homepage