import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db, auth } from './firebase.ts';
import {
  Profile,
  SocialLink,
  Skill,
  Technology,
  Project,
  Experience,
  Education,
  Certification,
  Achievement,
  Service,
  Testimonial,
  SiteSettings,
  ContactMessage
} from '../types/portfolio.ts';
import {
  initialProfile,
  initialSocialLinks,
  initialSkills,
  initialTechnologies,
  initialProjects,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialAchievements,
  initialServices,
  initialTestimonials,
  initialSiteSettings
} from './initialData.ts';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  };
  console.error('Firestore Error:', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// -------------------------------------------------------------
// PROFILE
// -------------------------------------------------------------
export function subscribeProfile(callback: (profile: Profile) => void) {
  const docRef = doc(db, 'profile', 'main');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...(snapshot.data() as Profile) });
      } else {
        // Fallback to initial
        callback(initialProfile);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'profile/main')
  );
}

export async function updateProfile(data: Partial<Profile>) {
  try {
    const docRef = doc(db, 'profile', 'main');
    await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'profile/main');
  }
}

// -------------------------------------------------------------
// SITE SETTINGS
// -------------------------------------------------------------
export function subscribeSiteSettings(callback: (settings: SiteSettings) => void) {
  const docRef = doc(db, 'siteSettings', 'default');
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback({ id: snapshot.id, ...(snapshot.data() as SiteSettings) });
      } else {
        callback(initialSiteSettings);
      }
    },
    (err) => handleFirestoreError(err, OperationType.GET, 'siteSettings/default')
  );
}

export async function updateSiteSettings(data: Partial<SiteSettings>) {
  try {
    const docRef = doc(db, 'siteSettings', 'default');
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, 'siteSettings/default');
  }
}

// -------------------------------------------------------------
// SOCIAL LINKS
// -------------------------------------------------------------
export function subscribeSocialLinks(callback: (links: SocialLink[]) => void) {
  const q = query(collection(db, 'socialLinks'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as SocialLink) }));
        callback(items);
      } else {
        callback(initialSocialLinks);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'socialLinks')
  );
}

export async function createSocialLink(link: Omit<SocialLink, 'id'>) {
  try {
    return await addDoc(collection(db, 'socialLinks'), link);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'socialLinks');
  }
}

export async function updateSocialLink(id: string, link: Partial<SocialLink>) {
  try {
    await updateDoc(doc(db, 'socialLinks', id), link);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `socialLinks/${id}`);
  }
}

export async function deleteSocialLink(id: string) {
  try {
    await deleteDoc(doc(db, 'socialLinks', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `socialLinks/${id}`);
  }
}

// -------------------------------------------------------------
// SKILLS
// -------------------------------------------------------------
export function subscribeSkills(callback: (skills: Skill[]) => void) {
  const q = query(collection(db, 'skills'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Skill) }));
        callback(items);
      } else {
        callback(initialSkills);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'skills')
  );
}

export async function createSkill(skill: Omit<Skill, 'id'>) {
  try {
    return await addDoc(collection(db, 'skills'), skill);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'skills');
  }
}

export async function updateSkill(id: string, skill: Partial<Skill>) {
  try {
    await updateDoc(doc(db, 'skills', id), skill);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `skills/${id}`);
  }
}

export async function deleteSkill(id: string) {
  try {
    await deleteDoc(doc(db, 'skills', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `skills/${id}`);
  }
}

// -------------------------------------------------------------
// TECHNOLOGIES
// -------------------------------------------------------------
export function subscribeTechnologies(callback: (techs: Technology[]) => void) {
  const q = query(collection(db, 'technologies'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Technology) }));
        callback(items);
      } else {
        callback(initialTechnologies);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'technologies')
  );
}

export async function createTechnology(tech: Omit<Technology, 'id'>) {
  try {
    return await addDoc(collection(db, 'technologies'), tech);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'technologies');
  }
}

export async function updateTechnology(id: string, tech: Partial<Technology>) {
  try {
    await updateDoc(doc(db, 'technologies', id), tech);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `technologies/${id}`);
  }
}

export async function deleteTechnology(id: string) {
  try {
    await deleteDoc(doc(db, 'technologies', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `technologies/${id}`);
  }
}

// -------------------------------------------------------------
// PROJECTS
// -------------------------------------------------------------
export function subscribeProjects(callback: (projects: Project[]) => void) {
  const q = query(collection(db, 'projects'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Project) }));
        callback(items);
      } else {
        callback(initialProjects);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'projects')
  );
}

export async function createProject(project: Omit<Project, 'id'>) {
  try {
    return await addDoc(collection(db, 'projects'), project);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'projects');
  }
}

export async function updateProject(id: string, project: Partial<Project>) {
  try {
    await updateDoc(doc(db, 'projects', id), project);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `projects/${id}`);
  }
}

export async function deleteProject(id: string) {
  try {
    await deleteDoc(doc(db, 'projects', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `projects/${id}`);
  }
}

// -------------------------------------------------------------
// EXPERIENCES
// -------------------------------------------------------------
export function subscribeExperiences(callback: (experiences: Experience[]) => void) {
  const q = query(collection(db, 'experiences'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Experience) }));
        callback(items);
      } else {
        callback(initialExperiences);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'experiences')
  );
}

export async function createExperience(exp: Omit<Experience, 'id'>) {
  try {
    return await addDoc(collection(db, 'experiences'), exp);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'experiences');
  }
}

export async function updateExperience(id: string, exp: Partial<Experience>) {
  try {
    await updateDoc(doc(db, 'experiences', id), exp);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `experiences/${id}`);
  }
}

export async function deleteExperience(id: string) {
  try {
    await deleteDoc(doc(db, 'experiences', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `experiences/${id}`);
  }
}

// -------------------------------------------------------------
// EDUCATION
// -------------------------------------------------------------
export function subscribeEducations(callback: (edus: Education[]) => void) {
  const q = query(collection(db, 'educations'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Education) }));
        callback(items);
      } else {
        callback(initialEducations);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'educations')
  );
}

export async function createEducation(edu: Omit<Education, 'id'>) {
  try {
    return await addDoc(collection(db, 'educations'), edu);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'educations');
  }
}

export async function updateEducation(id: string, edu: Partial<Education>) {
  try {
    await updateDoc(doc(db, 'educations', id), edu);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `educations/${id}`);
  }
}

export async function deleteEducation(id: string) {
  try {
    await deleteDoc(doc(db, 'educations', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `educations/${id}`);
  }
}

// -------------------------------------------------------------
// CERTIFICATIONS
// -------------------------------------------------------------
export function subscribeCertifications(callback: (certs: Certification[]) => void) {
  const q = query(collection(db, 'certifications'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Certification) }));
        callback(items);
      } else {
        callback(initialCertifications);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'certifications')
  );
}

export async function createCertification(cert: Omit<Certification, 'id'>) {
  try {
    return await addDoc(collection(db, 'certifications'), cert);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'certifications');
  }
}

export async function updateCertification(id: string, cert: Partial<Certification>) {
  try {
    await updateDoc(doc(db, 'certifications', id), cert);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `certifications/${id}`);
  }
}

export async function deleteCertification(id: string) {
  try {
    await deleteDoc(doc(db, 'certifications', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `certifications/${id}`);
  }
}

// -------------------------------------------------------------
// ACHIEVEMENTS
// -------------------------------------------------------------
export function subscribeAchievements(callback: (achs: Achievement[]) => void) {
  const q = query(collection(db, 'achievements'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Achievement) }));
        callback(items);
      } else {
        callback(initialAchievements);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'achievements')
  );
}

export async function createAchievement(ach: Omit<Achievement, 'id'>) {
  try {
    return await addDoc(collection(db, 'achievements'), ach);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'achievements');
  }
}

export async function updateAchievement(id: string, ach: Partial<Achievement>) {
  try {
    await updateDoc(doc(db, 'achievements', id), ach);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `achievements/${id}`);
  }
}

export async function deleteAchievement(id: string) {
  try {
    await deleteDoc(doc(db, 'achievements', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `achievements/${id}`);
  }
}

// -------------------------------------------------------------
// SERVICES
// -------------------------------------------------------------
export function subscribeServices(callback: (services: Service[]) => void) {
  const q = query(collection(db, 'services'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Service) }));
        callback(items);
      } else {
        callback(initialServices);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'services')
  );
}

export async function createService(service: Omit<Service, 'id'>) {
  try {
    return await addDoc(collection(db, 'services'), service);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'services');
  }
}

export async function updateService(id: string, service: Partial<Service>) {
  try {
    await updateDoc(doc(db, 'services', id), service);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `services/${id}`);
  }
}

export async function deleteService(id: string) {
  try {
    await deleteDoc(doc(db, 'services', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `services/${id}`);
  }
}

// -------------------------------------------------------------
// TESTIMONIALS
// -------------------------------------------------------------
export function subscribeTestimonials(callback: (tests: Testimonial[]) => void) {
  const q = query(collection(db, 'testimonials'), orderBy('order', 'asc'));
  return onSnapshot(
    q,
    (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as Testimonial) }));
        callback(items);
      } else {
        callback(initialTestimonials);
      }
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'testimonials')
  );
}

export async function createTestimonial(test: Omit<Testimonial, 'id'>) {
  try {
    return await addDoc(collection(db, 'testimonials'), test);
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'testimonials');
  }
}

export async function updateTestimonial(id: string, test: Partial<Testimonial>) {
  try {
    await updateDoc(doc(db, 'testimonials', id), test);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `testimonials/${id}`);
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await deleteDoc(doc(db, 'testimonials', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `testimonials/${id}`);
  }
}

// -------------------------------------------------------------
// CONTACT MESSAGES
// -------------------------------------------------------------
export function subscribeContactMessages(callback: (messages: ContactMessage[]) => void) {
  const q = query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as ContactMessage) }));
      callback(items);
    },
    (err) => handleFirestoreError(err, OperationType.LIST, 'contactMessages')
  );
}

export async function submitContactMessage(message: Omit<ContactMessage, 'id' | 'isRead' | 'createdAt'>) {
  try {
    // Basic rate limit check in localStorage
    const lastSent = localStorage.getItem('last_msg_sent');
    if (lastSent && Date.now() - parseInt(lastSent, 10) < 15000) {
      throw new Error('Please wait a moment before sending another message.');
    }

    const docRef = await addDoc(collection(db, 'contactMessages'), {
      ...message,
      isRead: false,
      createdAt: new Date().toISOString()
    });

    localStorage.setItem('last_msg_sent', Date.now().toString());
    return docRef;
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, 'contactMessages');
  }
}

export async function markContactMessageRead(id: string, isRead: boolean) {
  try {
    await updateDoc(doc(db, 'contactMessages', id), { isRead });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `contactMessages/${id}`);
  }
}

export async function deleteContactMessage(id: string) {
  try {
    await deleteDoc(doc(db, 'contactMessages', id));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `contactMessages/${id}`);
  }
}

// -------------------------------------------------------------
// SEEDING DATABASE WITH PRODUCTION DATA
// -------------------------------------------------------------
export async function seedDatabase(onProgress?: (step: string) => void) {
  try {
    onProgress?.('Writing Profile...');
    await setDoc(doc(db, 'profile', 'main'), initialProfile, { merge: true });

    onProgress?.('Writing Site Settings...');
    await setDoc(doc(db, 'siteSettings', 'default'), initialSiteSettings, { merge: true });

    onProgress?.('Writing Social Links...');
    for (const item of initialSocialLinks) {
      await addDoc(collection(db, 'socialLinks'), item);
    }

    onProgress?.('Writing Skills...');
    for (const item of initialSkills) {
      await addDoc(collection(db, 'skills'), item);
    }

    onProgress?.('Writing Technologies...');
    for (const item of initialTechnologies) {
      await addDoc(collection(db, 'technologies'), item);
    }

    onProgress?.('Writing Projects...');
    for (const item of initialProjects) {
      await addDoc(collection(db, 'projects'), item);
    }

    onProgress?.('Writing Experiences...');
    for (const item of initialExperiences) {
      await addDoc(collection(db, 'experiences'), item);
    }

    onProgress?.('Writing Educations...');
    for (const item of initialEducations) {
      await addDoc(collection(db, 'educations'), item);
    }

    onProgress?.('Writing Certifications...');
    for (const item of initialCertifications) {
      await addDoc(collection(db, 'certifications'), item);
    }

    onProgress?.('Writing Achievements...');
    for (const item of initialAchievements) {
      await addDoc(collection(db, 'achievements'), item);
    }

    onProgress?.('Writing Services...');
    for (const item of initialServices) {
      await addDoc(collection(db, 'services'), item);
    }

    onProgress?.('Writing Testimonials...');
    for (const item of initialTestimonials) {
      await addDoc(collection(db, 'testimonials'), item);
    }

    onProgress?.('Database seed completed successfully!');
    return true;
  } catch (err) {
    console.error('Error seeding database:', err);
    throw err;
  }
}
