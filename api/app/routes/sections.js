import express from 'express'
import { getAllSections, createSection, deleteSection, updateSection } from '../controllers/Section.controller'


const SectionRoutes = express.Router()

// SectionRoutes.get('/', getAllSections)
SectionRoutes.get('/all', getAllSections)
SectionRoutes.post('/create', createSection)
SectionRoutes.get('/:sectionid/delete', deleteSection)
SectionRoutes.post('/update', updateSection)


export default SectionRoutes