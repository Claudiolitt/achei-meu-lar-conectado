import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { mockProperties } from '@/data/mockProperties';
import PropertyCard from '../PropertyCard';

export default function ProfilePanel() {
  // Simulação de dados do usuário
  const userProperties = mockProperties.filter(p => p.ownerId === '1'); // Troque pelo id do usuário logado

  return (
    <div className="w-full">
      {/* Histórico */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Card className="flex-1 min-w-[220px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Histórico</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold">{userProperties.length}</div>
              <div className="text-xs text-muted-foreground">anúncios</div>
            </div>
            <div className="text-xs text-muted-foreground">Publicados nos últimos 180 dias</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros de anúncios */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex gap-2">
          <Input placeholder="Ex: Apartamento 2 quartos" className="w-full" />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="apartment">Apartamento</SelectItem>
              <SelectItem value="house">Casa</SelectItem>
              <SelectItem value="commercial">Comercial</SelectItem>
              <SelectItem value="land">Terreno</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Localização" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="sp">São Paulo</SelectItem>
              <SelectItem value="rj">Rio de Janeiro</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="recent">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Mais recentes</SelectItem>
              <SelectItem value="oldest">Mais antigos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Listagem de anúncios */}
      <div>
        {userProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-2">Você ainda não tem anúncios publicados</p>
            <Button asChild>
              <a href="/property-registration">Publicar anúncio</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 