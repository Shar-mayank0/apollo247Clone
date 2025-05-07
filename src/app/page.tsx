import React from 'react'
import TextContent from '@/components/textContent'
import FilterComponent from '@/components/filterComp'
import DocAdv from '@/components/docAdv'

function homepage() {
  return (
    <>
      <main className='main-container'>
        <div className='sidebarFilter'>
          <FilterComponent />
        </div>
        <div>
          <h1 className='main-heading'>docList container</h1>
        </div>
        <div className='add-container'>
          <DocAdv />
        </div>
      </main>
      <div className='lower-seo-content'>
        <TextContent />
      </div>
    </>
  )
}

export default homepage