# Documentación del Proyecto Portfolio - Joshua Jiménez

## 📋 Información General

**Desarrollador:** Joshua Jiménez  
**Email:** jjl1089@gmail.com  
**GitHub:** https://github.com/JoshKerosh  
**LinkedIn:** https://www.linkedin.com/in/joshuajl/  
**Repositorio:** https://github.com/JoshKerosh/portfolio

---

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 16.0.3** - App Router con Server Components
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **shadcn/ui** - Componentes pre-construidos
- **Framer Motion** - Animaciones
- **next-themes** - Modo oscuro/claro
- **lucide-react** - Íconos

### Backend
- **MongoDB Atlas** - Base de datos en la nube (tier gratuito M0, 512MB)
- **Mongoose** - ODM para MongoDB
- **nodemailer** - Envío de emails

### Componentes shadcn/ui Instalados
- card, button, badge, accordion, separator, tabs, avatar, input, label, textarea

---

## 📁 Estructura del Proyecto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Layout principal con tema
│   │   ├── page.tsx                # Página de inicio
│   │   ├── about/page.tsx          # Página sobre mí
│   │   ├── projects/page.tsx       # Página de proyectos
│   │   ├── skills/page.tsx         # Página de habilidades
│   │   ├── certifications/page.tsx # Página de certificaciones
│   │   ├── contact/page.tsx        # Formulario de contacto
│   │   └── api/
│   │       ├── seed-complete/route.ts  # Endpoint para poblar BD
│   │       ├── profile/route.ts        # GET perfil
│   │       ├── experience/route.ts     # GET experiencia
│   │       ├── education/route.ts      # GET educación
│   │       ├── about/route.ts          # GET secciones about
│   │       └── contact/route.ts        # POST contacto + email
│   ├── components/
│   │   ├── theme-provider.tsx      # Proveedor de tema
│   │   ├── layout/
│   │   │   ├── header.tsx          # Navegación + theme toggle
│   │   │   └── footer.tsx          # Footer con redes sociales
│   │   └── ui/                     # Componentes shadcn/ui
│   ├── lib/
│   │   └── mongodb.ts              # Conexión a MongoDB
│   ├── models/                     # Modelos Mongoose (8 colecciones)
│   │   ├── Profile.ts
│   │   ├── Experience.ts
│   │   ├── Education.ts
│   │   ├── About.ts
│   │   ├── Project.ts
│   │   ├── Skill.ts
│   │   ├── Certification.ts
│   │   └── Contact.ts
│   └── types/
│       └── index.ts                # Interfaces TypeScript
├── .env.local                      # Variables de entorno (NO en git)
├── .gitignore
├── DATABASE_STRUCTURE.md           # Esquema completo de BD
├── DATABASE_MIGRATION_COMPLETE.md  # Resumen de migración
├── GMAIL_SETUP.md                  # Guía Gmail App Password
└── README.md

```

---

## 🗄️ Estructura de Base de Datos

### Colecciones en MongoDB Atlas

**Cluster:** MyMongoDB  
**Database:** portfolio  
**Usuario:** Joshua  

#### 1. Profile (Perfil Personal)
```typescript
{
  fullName: string
  title: string
  bio: string
  location: { city, country, full }
  contact: { email, phone }
  socialMedia: { github, linkedin }
  availability: { status, openTo[] }
  stats: { yearsExperience, projectsCompleted, clientsServed }
}
```

#### 2. Experience (Experiencia Laboral)
```typescript
{
  title: string
  company: string
  employmentType: 'full-time' | 'part-time' | 'contract' | 'freelance'
  startDate: Date
  endDate?: Date
  current: boolean
  duration: string
  description: string
  responsibilities: string[]
  achievements: string[]
  technologies: string[]
  order: number
}
```

#### 3. Education (Educación)
```typescript
{
  degree: string
  institution: string
  location: string
  fieldOfStudy: string
  graduationYear: string
  description: string
  achievements: string[]
  relevantCourses: string[]
  order: number
}
```

#### 4. About (Secciones About)
```typescript
{
  section: 'intro' | 'background' | 'interests' | 'goals' | 'values'
  title: string
  content: string
  highlights: string[]
  order: number
  visible: boolean
}
```

#### 5. Projects (Proyectos)
```typescript
{
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  image: string
  images?: string[]
  githubUrl?: string
  liveUrl?: string
  category: string
  featured: boolean
  status?: 'completed' | 'in-progress' | 'planned'
  role?: string
  teamSize?: number
  startDate?: Date
  endDate?: Date
  challenges?: string[]
  solutions?: string[]
  outcomes?: string[]
  order?: number
}
```

#### 6. Skills (Habilidades)
```typescript
{
  id: string
  name: string
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'Languages'
  level: number (0-100)
  icon?: string
  yearsOfExperience?: number
  featured: boolean
  description?: string
  projects?: string[]
  order?: number
  tags?: string[]
}
```

#### 7. Certifications (Certificaciones)
```typescript
{
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate?: string
  credentialId?: string
  credentialUrl?: string
  description: string
  skills: string[]
  image?: string
  status?: 'active' | 'expired' | 'in-progress'
  featured?: boolean
  order?: number
}
```

#### 8. Contact (Mensajes de Contacto)
```typescript
{
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}
```

---

## 🔐 Variables de Entorno

**Archivo:** `.env.local` (excluido de git)

```env
# MongoDB Atlas
MONGODB_URI=mongodb+srv://Joshua:j0shk3r0sh@mymongodb.hteve5f.mongodb.net/portfolio?retryWrites=true&w=majority&appName=MyMongoDB

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=jjl1089@gmail.com
EMAIL_PASS=sxdktjdvtxuudoeb
EMAIL_TO=jjl1089@gmail.com
```

---

## 🚀 Comandos Importantes

### Desarrollo Local
```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo (puerto 3000)
npm run dev

# Poblar base de datos con información real
# Visitar: http://localhost:3000/api/seed-complete

# Build para producción
npm run build

# Iniciar servidor de producción
npm start
```

### Git & GitHub
```bash
# Inicializar repositorio
git init

# Agregar archivos
git add .

# Commit
git commit -m "mensaje"

# Agregar remoto (HTTPS)
git remote add origin https://github.com/JoshKerosh/portfolio.git

# Push a GitHub
git push -u origin main
```

### Vercel CLI
```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login a Vercel
vercel login

# Deploy
vercel --prod
```

---

## 📝 Páginas del Portfolio

### 1. Home (`/`)
- Muestra perfil (nombre, bio, disponibilidad)
- 3 proyectos destacados
- 6 habilidades destacadas
- Animaciones con Framer Motion

### 2. About (`/about`)
- Información personal completa
- Experiencia laboral con logros
- Educación académica
- Secciones dinámicas (intro, background, interests, goals)

### 3. Projects (`/projects`)
- Lista completa de proyectos
- Acordeón interactivo
- Tecnologías, GitHub, demo links
- Challenges, solutions, outcomes

### 4. Skills (`/skills`)
- Tabs por categoría
- Barras de progreso con nivel
- Años de experiencia
- Tags y descripción

### 5. Certifications (`/certifications`)
- Cards de certificaciones
- Estado (active, expired, in-progress)
- Skills relacionadas
- Enlaces a credenciales

### 6. Contact (`/contact`)
- Formulario de contacto
- Validación de campos
- Guarda en MongoDB
- Envía email con nodemailer
- Mensaje de confirmación

---

## 🐛 Problemas Resueltos

### 1. Puerto 3000 ocupado
```bash
# Windows PowerShell
Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

### 2. MongoDB local no funciona
**Solución:** Migrado a MongoDB Atlas (nube gratuita)

### 3. Errores de TypeScript en modelos
**Solución:** Sincronizar interfaces en `src/types/index.ts` con campos en schemas

### 4. Imports case-sensitive
**Solución:** Asegurar que imports coincidan exactamente con nombres de archivo

### 5. .next lock files
```bash
Remove-Item -Recurse -Force .next
npm run dev
```

### 6. Componentes shadcn faltantes
```bash
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add textarea
```

### 7. Git SSH authentication failed
**Solución:** Cambiar a HTTPS
```bash
git remote remove origin
git remote add origin https://github.com/JoshKerosh/portfolio.git
git push -u origin main
```

### 8. Email EAUTH errors
**Solución:** Gmail App Password (sin espacios en .env.local)

---

## 🌐 Deployment en Vercel

### Pasos para Deploy

1. **Login en Vercel**
   - Ir a https://vercel.com
   - Login con GitHub

2. **Importar Repositorio**
   - New Project → Import Git Repository
   - Seleccionar: `JoshKerosh/portfolio`

3. **Configurar Variables de Entorno**
   - Settings → Environment Variables
   - Agregar todas las variables de `.env.local`
   - Aplicar a: Production, Preview, Development

4. **Configurar MongoDB Atlas**
   - MongoDB Atlas → Network Access
   - Add IP Address → Allow Access from Anywhere (0.0.0.0/0)

5. **Deploy**
   - Click "Deploy"
   - Esperar build (~2-3 minutos)

6. **Poblar Base de Datos**
   - Visitar: `https://tu-url.vercel.app/api/seed-complete`
   - Verificar mensaje de éxito

7. **Verificar Funcionamiento**
   - Navegar por todas las páginas
   - Probar formulario de contacto
   - Verificar modo oscuro/claro

---

## 📧 Configuración de Email

### Gmail App Password

1. Ir a Google Account → Security
2. Activar 2-Step Verification
3. Buscar "App passwords"
4. Generar password para "Mail" / "Other (Custom name)"
5. Copiar el password de 16 caracteres
6. Agregar a `.env.local` sin espacios:
   ```
   EMAIL_PASS=sxdktjdvtxuudoeb
   ```

**Ver:** `GMAIL_SETUP.md` para instrucciones detalladas

---

## 🔄 Workflow de Actualización

### Para agregar nuevo contenido:

1. **Actualizar modelo si es necesario**
   ```typescript
   // src/models/NuevoModelo.ts
   ```

2. **Actualizar tipos TypeScript**
   ```typescript
   // src/types/index.ts
   ```

3. **Modificar seed data**
   ```typescript
   // src/app/api/seed-complete/route.ts
   ```

4. **Commit y push**
   ```bash
   git add .
   git commit -m "Descripción del cambio"
   git push
   ```

5. **Vercel auto-deploy**
   - Vercel detecta push y redeploy automático

6. **Re-seed database (si hay cambios en estructura)**
   - Visitar: `https://tu-url.vercel.app/api/seed-complete`

---

## 📚 Recursos y Referencias

### Documentación
- [Next.js 15 Docs](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/docs/atlas/)
- [Mongoose](https://mongoosejs.com/docs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

### Archivos de Referencia en el Proyecto
- `DATABASE_STRUCTURE.md` - Esquema completo de BD
- `DATABASE_MIGRATION_COMPLETE.md` - Historial de migración
- `GMAIL_SETUP.md` - Configuración de email
- `README.md` - README del proyecto

---

## ✅ Estado del Proyecto

### Completado
- ✅ Proyecto Next.js 16 con TypeScript
- ✅ MongoDB Atlas configurado y conectado
- ✅ 8 modelos de datos con schemas completos
- ✅ Tema oscuro/claro funcional
- ✅ 6 páginas principales implementadas
- ✅ Sistema de navegación con Header/Footer
- ✅ Formulario de contacto con email
- ✅ Base de datos poblada con información real
- ✅ Git repository en GitHub
- ✅ Código sincronizado y versionado

### Pendiente/Opcional
- ⏳ Deploy a Vercel (en proceso)
- ⏳ Verificar email en producción
- ⏳ Páginas individuales de proyectos
- ⏳ Funcionalidad de blog (modelo existe, falta implementar)
- ⏳ Imágenes reales de proyectos
- ⏳ Panel de administración
- ⏳ Analytics tracking

---

## 💡 Notas Importantes

1. **Nunca commitear `.env.local`** - Ya está en `.gitignore`

2. **MongoDB Atlas tiene límite gratuito de 512MB** - Suficiente para portfolio

3. **Vercel usa IPs dinámicas** - Siempre usar "Allow from Anywhere" en MongoDB

4. **Gmail App Password** - Necesario para SMTP, no usar contraseña normal

5. **Server Components por defecto** - Solo usar 'use client' cuando sea necesario

6. **Mongoose caching** - Implementado en `lib/mongodb.ts` para optimizar conexiones

7. **Seed endpoint** - No protegido, considerar agregar autenticación en producción

---

## 📞 Contacto y Soporte

**Desarrollador:** Joshua Jiménez  
**Email:** jjl1089@gmail.com  
**Ubicación:** San José, Costa Rica  
**Teléfono:** +506 7284-8846  

**GitHub:** [@JoshKerosh](https://github.com/JoshKerosh)  
**LinkedIn:** [joshuajl](https://www.linkedin.com/in/joshuajl/)  

---

**Última actualización:** 20 de Noviembre, 2025  
**Versión del documento:** 1.0
