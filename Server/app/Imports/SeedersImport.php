<?php


namespace App\Imports;


use Maatwebsite\Excel\Concerns\WithConditionalSheets;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class SeedersImport implements WithMultipleSheets
{
    /**
     * @return array
     */
    public function sheets(): array
    {
        return [
            'Consejos'              => new CPopularsImport(),
            'Estados de Denuncia'   => new StatusesImport(),
            'Vias de Denuncia'      => new WaysImport(),
            'Tipos de Denuncia'     => new TypesImport(),
            'Casos de Denuncia'     => new CasesImport(),
            'Tipos de Razon'        => new ReasonTypesImport(),
            'Entidades'             => new AgenciesImport(),
        ];
    }
}
