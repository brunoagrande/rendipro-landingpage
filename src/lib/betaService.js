import { supabase } from './supabase'

/**
 * Submete uma candidatura ao programa beta.
 * Retorna { success, error, isDuplicate }
 */
export async function submitBetaApplication(data) {
    try {
        const { error } = await supabase
            .from('tb_candidaturas_beta')
            .insert([{
                nome: data.nome,
                email: data.email,
                perfil: data.perfil,
                objetivo: data.objetivo || null,
                tempo_estudo: data.tempo_estudo,
                horas_semana: data.horas_semana,
                motivacao: data.motivacao,
                status: 'pendente',
            }])

        if (error) {
            // Unique constraint violation on email
            if (error.code === '23505') {
                return {
                    success: false,
                    isDuplicate: true,
                    error: 'Esse email já foi cadastrado. Fique de olho na sua caixa de entrada.',
                }
            }
            return {
                success: false,
                isDuplicate: false,
                error: 'Algo deu errado. Tente novamente ou entre em contato.',
            }
        }

        return { success: true, isDuplicate: false, error: null }
    } catch {
        return {
            success: false,
            isDuplicate: false,
            error: 'Algo deu errado. Tente novamente ou entre em contato.',
        }
    }
}
